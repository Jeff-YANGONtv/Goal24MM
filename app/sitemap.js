import { fetchRssPosts } from '@/lib/rss';

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goal24mm.com';

  // Fetch all posts for dynamic routes
  let posts = [];
  try {
    posts = await fetchRssPosts();
  } catch (error) {
    console.error('Sitemap fetch error:', error);
  }

  const postEntries = posts.map((post) => ({
    url: `${siteUrl}/news/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const staticEntries = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/live`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/odds`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [...staticEntries, ...postEntries];
}
