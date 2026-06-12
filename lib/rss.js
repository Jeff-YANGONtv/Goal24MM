import { parseStringPromise } from 'xml2js';

const RSS_FEED_URL = 'https://goal24mm.wordpress.com/feed/';

/**
 * Fetch and parse RSS feed from WordPress
 */
export async function fetchRSSFeed() {
  try {
    const response = await fetch(RSS_FEED_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const parsed = await parseStringPromise(xmlText);

    // Extract items from RSS feed
    const items = parsed.rss.channel[0].item || [];

    return items.map((item) => {
      const title = item.title?.[0] || 'Untitled';
      const link = item.link?.[0] || '';
      const description = item.description?.[0] || '';
      const pubDate = item.pubDate?.[0] || '';
      const content = item['content:encoded']?.[0] || description;
      const image = extractImageFromContent(content);
      const slug = generateSlug(link);

      return {
        id: slug,
        title,
        link,
        description: stripHtml(description).substring(0, 200),
        fullContent: content,
        pubDate: new Date(pubDate),
        image,
        slug,
      };
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

/**
 * Get a single article by slug
 */
export async function getArticleBySlug(slug) {
  const articles = await fetchRSSFeed();
  return articles.find((article) => article.slug === slug);
}

/**
 * Get related articles (same category or similar title)
 */
export async function getRelatedArticles(currentSlug, limit = 3) {
  const articles = await fetchRSSFeed();
  return articles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, limit);
}

/**
 * Extract image URL from HTML content
 */
function extractImageFromContent(content) {
  if (!content) return null;

  // Look for img tags
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
  if (imgMatch) {
    return imgMatch[1];
  }

  return null;
}

/**
 * Strip HTML tags from text
 */
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Generate URL-friendly slug from link
 */
function generateSlug(link) {
  try {
    const url = new URL(link);
    const pathname = url.pathname;
    // Extract the last part of the URL as slug
    const slug = pathname.split('/').filter(Boolean).pop() || 'article';
    return slug.replace(/\/$/, '');
  } catch {
    // Fallback: use timestamp-based slug
    return `article-${Date.now()}`;
  }
}
