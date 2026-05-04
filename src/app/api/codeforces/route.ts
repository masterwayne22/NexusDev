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

    // Fetch user submissions to calculate solved count
    const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
    const statusData = await statusRes.json();

    let solvedCount = 0;
    if (statusData.status === 'OK') {
      const solvedProblems = new Set();
      statusData.result.forEach((submission: any) => {
        if (submission.verdict === 'OK') {
          const problemId = `${submission.problem.contestId}${submission.problem.index}`;
          solvedProblems.add(problemId);
        }
      });
      solvedCount = solvedProblems.size;
    }

    return NextResponse.json({
      username: userInfo.handle,
      rating: userInfo.rating || 0,
      maxRating: userInfo.maxRating || 0,
      rank: userInfo.rank || 'Unranked',
      maxRank: userInfo.maxRank || 'Unranked',
      solved: solvedCount
    });
  } catch (error) {
    console.error('Codeforces API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
