'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function updateUserConnections(data: { githubUsername?: string; leetcodeUsername?: string }) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const client = await clerkClient();
  
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      githubUsername: data.githubUsername,
      leetcodeUsername: data.leetcodeUsername,
    }
  });

  revalidatePath('/dashboard');
  revalidatePath('/github');
  revalidatePath('/leetcode');
}
