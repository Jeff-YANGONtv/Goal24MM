import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'content'],
      ['dc:creator', 'creator'],
      ['media:content', 'media'],
      ['media:thumbnail', 'thumbnail'],
    ],
  },
});

const RSS_URL = 'https://goal24mm.wordpress.com/feed/';

/**
 * Normalizes an RSS item into a consistent format.
 */
function normalizePost(item) {
  // Extract image from various possible locations in the RSS feed
  let image = null;
  
  // 1. Try media:content (WordPress often uses this)
  if (item.media && item.media.$ && item.media.$.url) {
    image = item.media.$.url;
  } 
  // 2. Try media:thumbnail
  else if (item.thumbnail && item.thumbnail.$ && item.thumbnail.$.url) {
    image = item.thumbnail.$.url;
  }
  // 3. Try parsing from content if no media tags found
  else if (item.content) {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const match = imgRegex.exec(item.content);
    if (match) {
      image = match[1];
    }
  }

  // Generate slug from the link
  // WordPress link format: https://goal24mm.wordpress.com/2026/06/13/slug/
  const link = item.link || '';
  const slug = link
    .replace(/\/$/, '') // Remove trailing slash
    .split('/')
    .pop();

  // Create excerpt
  let excerpt = item.contentSnippet || '';
  if (!excerpt && item.content) {
    excerpt = item.content
      .replace(/<[^>]*>?/gm, '') // Strip HTML
      .substring(0, 160)
      .trim() + '...';
  }

  return {
    title: item.title,
    slug: slug,
    link: item.link,
    date: item.pubDate,
    excerpt: excerpt,
    content: item.content || '',
    image: image || '/placeholder-news.jpg',
    author: item.creator || 'Goal24MM',
    categories: item.categories || [],
  };
}

export async function fetchRssPosts() {
  try {
    const feed = await parser.parseURL(RSS_URL);
    return feed.items.map(normalizePost);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

export async function fetchSingleRssPost(slug) {
  try {
    const posts = await fetchRssPosts();
    const post = posts.find((p) => p.slug === slug);
    return post || null;
  } catch (error) {
    console.error(`Error fetching single RSS post for slug: ${slug}`, error);
    return null;
  }
}

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
