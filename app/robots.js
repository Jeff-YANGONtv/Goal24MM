export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goal24mm.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
