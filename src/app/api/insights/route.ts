import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { githubRepos, leetcodeSolved } = await request.json();

    const insights = [];
    
    // Logic based on user's specific request
    if (leetcodeSolved > 50) {
      insights.push("Strong algorithmic foundation.");
    } else {
      insights.push("Your algorithmic profile is still in the early stages; consider solving more Medium/Hard problems.");
    }

    if (githubRepos < 10) {
      insights.push("Commit more often to build a public proof of work.");
    } else {
      insights.push("You have a healthy number of repositories; focus on quality and documentation next.");
    }

    const aiSummary = insights.join(' ');

    return NextResponse.json({ 
      summary: aiSummary,
      rawStats: { githubRepos, leetcodeSolved },
      timestamp: new Date().toISOString()
    });
  } catch {
    return NextResponse.json({ error: 'Failed to generate AI insights' }, { status: 500 });
  }
}
