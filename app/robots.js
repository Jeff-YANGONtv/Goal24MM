export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goal24mm.vercel.app';

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
