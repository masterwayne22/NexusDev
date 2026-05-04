import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const username = user.publicMetadata.leetcode_username as string;

    if (!username) {
      return NextResponse.json({ error: 'LeetCode account not linked' }, { status: 404 });
    }

    // Mock data for now since LeetCode doesn't have a simple public REST API without CORS/auth issues
    // In a real app, you'd use a GraphQL query to https://leetcode.com/graphql
    return NextResponse.json({
      username,
      easy: 152,
      medium: 145,
      hard: 45,
      ranking: 125000,
      streak: 15,
      weakTopics: [
        { tag: 'Dynamic Programming', accuracy: 0.45, solved: 12 },
        { tag: 'Graphs', accuracy: 0.52, solved: 8 },
        { tag: 'Trie', accuracy: 0.30, solved: 2 }
      ],
      recommendations: [
        { name: 'Edit Distance', difficulty: 'Hard', id: '72' },
        { name: 'Course Schedule II', difficulty: 'Medium', id: '210' },
        { name: 'Word Search II', difficulty: 'Hard', id: '212' }
      ]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
