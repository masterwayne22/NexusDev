import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'octocat';

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'GitHub user not found' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({
      repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      name: data.name,
      avatar: data.avatar_url,
      bio: data.bio,
      location: data.location,
      blog: data.blog,
      // Mocking stars for now to keep it simple as requested
      stars: Math.floor(Math.random() * 50) + 10, 
    });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
