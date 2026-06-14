/**
 * Robots.txt Route
 * Provides search engine crawling instructions
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goal24mm.vercel.app';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
