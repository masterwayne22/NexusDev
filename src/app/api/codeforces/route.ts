import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const username = user.publicMetadata.codeforces_username as string;

    if (!username) {
      return NextResponse.json({ error: 'Codeforces account not linked' }, { status: 404 });
    }

    // Fetch user info
    const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
    const infoData = await infoRes.json();

    if (infoData.status !== 'OK') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userInfo = infoData.result[0];

    // Fetch user submissions to calculate solved count and weak areas
    const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
    const statusData = await statusRes.json();

    let solvedCount = 0;
    const tagStats: Record<string, { solved: number; total: number }> = {};
    const unsolvedProblems: any[] = [];

    if (statusData.status === 'OK') {
      const solvedProblemIds = new Set();
      
      statusData.result.forEach((submission: any) => {
        const problemId = `${submission.problem.contestId}${submission.problem.index}`;
        const tags = submission.problem.tags || [];

        tags.forEach((tag: string) => {
          if (!tagStats[tag]) tagStats[tag] = { solved: 0, total: 0 };
          tagStats[tag].total++;
        });

        if (submission.verdict === 'OK') {
          if (!solvedProblemIds.has(problemId)) {
            solvedCount++;
            solvedProblemIds.add(problemId);
            tags.forEach((tag: string) => tagStats[tag].solved++);
          }
        } else {
          unsolvedProblems.push({
            id: problemId,
            name: submission.problem.name,
            rating: submission.problem.rating,
            tags: submission.problem.tags
          });
        }
      });
    }

    // Identify weak tags (high attempt/solved ratio or low solved count in common topics)
    const weakTopics = Object.entries(tagStats)
      .map(([tag, stats]) => ({
        tag,
        accuracy: stats.solved / stats.total,
        solved: stats.solved
      }))
      .filter(item => item.solved < 5 || item.accuracy < 0.6)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3);

    return NextResponse.json({
      username: userInfo.handle,
      rating: userInfo.rating || 0,
      maxRating: userInfo.maxRating || 0,
      rank: userInfo.rank || 'Unranked',
      maxRank: userInfo.maxRank || 'Unranked',
      solved: solvedCount,
      weakTopics,
      recommendations: unsolvedProblems.slice(0, 3)
    });
  } catch (error) {
    console.error('Codeforces API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
