import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const username = user.publicMetadata.leetcodeUsername as string;

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
      streak: 15
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
