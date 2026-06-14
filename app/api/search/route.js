/**
 * Search API Route
 * Handles search queries and returns matching posts
 */

import { searchPosts } from '@/lib/rss';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return Response.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const results = await searchPosts(query, 20);

    return Response.json(
      {
        success: true,
        query,
        count: results.length,
        results,
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800',
        },
      }
    );
  } catch (error) {
    console.error('Search API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
