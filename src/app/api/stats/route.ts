import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const metadataUsername = user.publicMetadata.githubUsername as string;

    let githubDataUrl = 'https://api.github.com/user';
    let headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };

    const tokenResponse = await client.users.getUserOauthAccessToken(
      userId,
      'oauth_github'
    );
    const token = tokenResponse.data[0]?.token;

    if (metadataUsername) {
      // If they provided a specific username, fetch that public profile
      githubDataUrl = `https://api.github.com/users/${metadataUsername}`;
      if (token) headers['Authorization'] = `Bearer ${token}`;
    } else if (token) {
      // Use OAuth token to get their own profile
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      return NextResponse.json({ error: 'GitHub account not linked' }, { status: 404 });
    }

    const userResponse = await fetch(githubDataUrl, { headers });

    if (!userResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: userResponse.status });
    }

    const data = await userResponse.json();

    return NextResponse.json({
      repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      name: data.name,
      avatar: data.avatar_url,
      bio: data.bio,
      location: data.location,
      blog: data.blog,
      stars: Math.floor(Math.random() * 50) + 10, // Keep mock stars for now
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
