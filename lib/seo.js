/**
 * SEO Utilities
 * Helpers for generating metadata, structured data, and SEO-related content
 */

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Goal24MM';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goal24mm.vercel.app';
const SITE_DESCRIPTION = 'Stay updated with the latest football news, live scores, odds, and predictions on Goal24MM.';

/**
 * Generate metadata for a page
 */
export function generateMetadata(options = {}) {
  const {
    title,
    description,
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    keywords,
  } = options;

  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Latest Football News & Live Scores`;
  const fullDescription = description || SITE_DESCRIPTION;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const fullImage = image || `${SITE_URL}/og-image.jpg`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords || ['football news', 'live scores', 'football odds', 'predictions'],
    authors: [{ name: author || 'Goal24MM Team' }],
    creator: 'Goal24MM',
    publisher: 'Goal24MM',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: 'en_GB',
      type,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: '@Goal24MM',
    },
  };
}

/**
 * Generate NewsArticle JSON-LD schema
 */
export function generateNewsArticleSchema(options = {}) {
  const {
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author,
    url,
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline,
    description,
    image: Array.isArray(image) ? image : [image],
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    author: Array.isArray(author)
      ? author.map(a => ({
          '@type': 'Person',
          name: typeof a === 'string' ? a : a.name,
          url: typeof a === 'object' ? a.url : undefined,
        }))
      : [
          {
            '@type': 'Person',
            name: author || 'Goal24MM',
            url: SITE_URL,
          },
        ],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 250,
        height: 60,
      },
    },
    url: url || SITE_URL,
  };
}

/**
 * Generate Article JSON-LD schema
 */
export function generateArticleSchema(options = {}) {
  const {
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author,
    url,
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: Array.isArray(image) ? image : [image],
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    author: Array.isArray(author)
      ? author.map(a => ({
          '@type': 'Person',
          name: typeof a === 'string' ? a : a.name,
        }))
      : [
          {
            '@type': 'Person',
            name: author || 'Goal24MM',
          },
        ],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 250,
        height: 60,
      },
    },
    url: url || SITE_URL,
  };
}

/**
 * Generate Breadcrumb JSON-LD schema
 */
export function generateBreadcrumbSchema(items = []) {
  const breadcrumbs = [
    {
      position: 1,
      name: SITE_NAME,
      item: SITE_URL,
    },
    ...items.map((item, index) => ({
      position: index + 2,
      name: item.name,
      item: item.url,
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs,
  };
}

/**
 * Generate Organization JSON-LD schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    sameAs: [
      'https://twitter.com/Goal24MM',
      'https://facebook.com/Goal24MM',
      'https://instagram.com/Goal24MM',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'contact@goal24mm.com',
    },
  };
}

/**
 * Generate WebSite JSON-LD schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path = '/') {
  return `${SITE_URL}${path}`;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /static/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}
