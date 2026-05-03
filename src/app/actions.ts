'use server';

import { clerkClient } from '@clerk/nextjs/server';

export async function updateUsername(userId: string, type: 'github' | 'leetcode', username: string) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      [`${type}_username`]: username // Saves as github_username or leetcode_username
    }
  });
}
