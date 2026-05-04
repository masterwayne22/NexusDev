'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function updateUsername(userId: string, type: 'github' | 'leetcode' | 'codeforces', username: string) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      [`${type}_username`]: username // Saves as github_username or leetcode_username
    }
  });

  // Force On-Demand Revalidation for relevant paths
  revalidatePath('/dashboard');
  revalidatePath('/');
}
