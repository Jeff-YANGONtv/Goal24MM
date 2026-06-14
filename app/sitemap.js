/**
 * Sitemap Route
 * Generates XML sitemap for search engines
 */

import { fetchRssPosts, getAllCategories } from '@/lib/rss';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goal24mm.vercel.app';

export default async function sitemap() {
  const baseUrl = SITE_URL;

  try {
    // Fetch all posts
    const posts = await fetchRssPosts();
    
    // Fetch all categories
    const categories = await getAllCategories();

    // Generate post entries
    const postEntries = posts.map((post) => ({
      url: `${baseUrl}/news/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Generate category entries
    const categoryEntries = categories.map((category) => ({
      url: `${baseUrl}/categories/${encodeURIComponent(category)}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.7,
    }));

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/articles`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/live`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'hourly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/odds`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ];

    return [...staticPages, ...categoryEntries, ...postEntries];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return minimal sitemap on error
    return [
      {
        url: SITE_URL,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}
