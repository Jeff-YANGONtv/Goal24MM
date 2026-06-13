import Parser from 'rss-parser';

/**
 * RSS Configuration
 */
const RSS_CONFIG = {
  url: process.env.NEXT_PUBLIC_RSS_FEED_URL || 'https://goal24mm.wordpress.com/feed/',
  customFields: {
    item: [
      ['content:encoded', 'content'],
      ['dc:creator', 'creator'],
      ['media:content', 'media'],
      ['media:thumbnail', 'thumbnail'],
    ],
  },
};

const parser = new Parser({
  customFields: RSS_CONFIG.customFields,
});

/**
 * UTILITY: Extract image from RSS item
 */
function extractImage(item) {
  // 1. Try media:content
  if (item.media && item.media.$ && item.media.$.url) {
    return item.media.$.url;
  } 
  // 2. Try media:thumbnail
  if (item.thumbnail && item.thumbnail.$ && item.thumbnail.$.url) {
    return item.thumbnail.$.url;
  }
  // 3. Try parsing from content
  if (item.content) {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const match = imgRegex.exec(item.content);
    if (match) return match[1];
  }
  return '/placeholder-news.jpg';
}

/**
 * UTILITY: Generate slug from link
 */
function generateSlug(link) {
  if (!link) return 'no-slug';
  return link
    .replace(/\/$/, '') // Remove trailing slash
    .split('/')
    .pop();
}

/**
 * UTILITY: Create excerpt from content
 */
function createExcerpt(item) {
  let excerpt = item.contentSnippet || '';
  if (!excerpt && item.content) {
    excerpt = item.content
      .replace(/<[^>]*>?/gm, '') // Strip HTML
      .substring(0, 160)
      .trim() + '...';
  }
  return excerpt;
}

/**
 * TRANSFORM: Normalize an RSS item into a consistent format.
 */
function transformRssItem(item) {
  return {
    title: item.title || 'Untitled',
    slug: generateSlug(item.link),
    link: item.link || '#',
    date: item.pubDate || new Date().toISOString(),
    excerpt: createExcerpt(item),
    content: item.content || '',
    image: extractImage(item),
    author: item.creator || 'Goal24MM',
    categories: item.categories || [],
  };
}

/**
 * FETCH: Fetches RSS posts with error handling.
 */
export async function fetchRssPosts() {
  if (!RSS_CONFIG.url) {
    console.error('RSS_URL is not defined');
    return [];
  }

  try {
    const feed = await parser.parseURL(RSS_CONFIG.url);
    if (!feed || !feed.items) return [];
    
    return feed.items.map(transformRssItem);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

/**
 * FETCH: Fetches a single post by slug.
 */
export async function fetchSingleRssPost(slug) {
  if (!slug) return null;
  
  try {
    const posts = await fetchRssPosts();
    return posts.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching single RSS post for slug: ${slug}`, error);
    return null;
  }
}

/**
 * FETCH: Fetches related posts excluding the current one.
 */
export async function fetchRelatedPosts(currentSlug, limit = 3) {
  try {
    const posts = await fetchRssPosts();
    return posts
      .filter((p) => p.slug !== currentSlug)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}
