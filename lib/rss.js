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
  timeout: 10000, // 10 second timeout
});

/**
 * UTILITY: Extract image from RSS item with fallback logic
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
  // 4. Try description
  if (item.description) {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const match = imgRegex.exec(item.description);
    if (match) return match[1];
  }
  return '/placeholder-news.jpg';
}

/**
 * UTILITY: Generate slug from link
 */
function generateSlug(link) {
  if (!link) return `post-${Date.now()}`;
  return link
    .replace(/\/$/, '') // Remove trailing slash
    .split('/')
    .pop()
    .replace(/[^a-z0-9-]/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
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
      .trim();
  }
  
  if (!excerpt && item.description) {
    excerpt = item.description
      .replace(/<[^>]*>?/gm, '') // Strip HTML
      .substring(0, 160)
      .trim();
  }
  
  return excerpt ? `${excerpt}...` : 'No description available.';
}

/**
 * UTILITY: Validate and optimize image URL
 */
function optimizeImageUrl(url) {
  if (!url) return '/placeholder-news.jpg';
  
  // Check if URL is valid
  try {
    new URL(url);
    return url;
  } catch (e) {
    console.warn('Invalid image URL:', url);
    return '/placeholder-news.jpg';
  }
}

/**
 * TRANSFORM: Normalize an RSS item into a consistent format.
 */
function transformRssItem(item) {
  if (!item.title && !item.link) {
    return null; // Skip invalid items
  }

  return {
    title: item.title || 'Untitled',
    slug: generateSlug(item.link),
    link: item.link || '#',
    date: item.pubDate || new Date().toISOString(),
    excerpt: createExcerpt(item),
    content: item.content || item.description || '',
    image: optimizeImageUrl(extractImage(item)),
    author: item.creator || 'Goal24MM',
    categories: item.categories || [],
    guid: item.guid || item.link,
  };
}

/**
 * FETCH: Fetches RSS posts with error handling and retry logic.
 */
export async function fetchRssPosts(retries = 3) {
  if (!RSS_CONFIG.url) {
    console.error('RSS_URL is not defined');
    return [];
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const feed = await parser.parseURL(RSS_CONFIG.url);
      
      if (!feed || !feed.items) {
        console.warn('Empty RSS feed received');
        return [];
      }

      const posts = feed.items
        .map(transformRssItem)
        .filter(post => post !== null)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      console.log(`Successfully fetched ${posts.length} RSS posts`);
      return posts;
    } catch (error) {
      console.error(`RSS fetch attempt ${attempt + 1}/${retries} failed:`, error.message);
      
      if (attempt < retries - 1) {
        // Exponential backoff
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  console.error('Failed to fetch RSS feed after all retries');
  return [];
}

/**
 * FETCH: Fetches a single post by slug with fallback.
 */
export async function fetchSingleRssPost(slug) {
  if (!slug) return null;

  try {
    const posts = await fetchRssPosts();
    const post = posts.find((p) => p.slug === slug);
    
    if (!post) {
      console.warn(`Post with slug "${slug}" not found`);
      return null;
    }

    return post;
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

/**
 * FETCH: Fetches trending posts (most recent)
 */
export async function fetchTrendingPosts(limit = 5) {
  try {
    const posts = await fetchRssPosts();
    return posts.slice(0, limit);
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    return [];
  }
}

/**
 * FETCH: Fetches posts by category
 */
export async function fetchPostsByCategory(categoryName, limit = 10) {
  try {
    const posts = await fetchRssPosts();
    return posts
      .filter((p) => 
        p.categories.some(cat => 
          cat.toLowerCase() === categoryName.toLowerCase()
        )
      )
      .slice(0, limit);
  } catch (error) {
    console.error(`Error fetching posts for category: ${categoryName}`, error);
    return [];
  }
}

/**
 * SEARCH: Search posts by title or excerpt
 */
export async function searchPosts(query, limit = 10) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  try {
    const posts = await fetchRssPosts();
    const searchTerm = query.toLowerCase();
    
    return posts
      .filter((p) =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.excerpt.toLowerCase().includes(searchTerm)
      )
      .slice(0, limit);
  } catch (error) {
    console.error(`Error searching posts with query: ${query}`, error);
    return [];
  }
}

/**
 * UTILITY: Get all unique categories from posts
 */
export async function getAllCategories() {
  try {
    const posts = await fetchRssPosts();
    const categories = new Set();
    
    posts.forEach((post) => {
      post.categories.forEach((cat) => {
        categories.add(cat);
      });
    });

    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * UTILITY: Get posts count
 */
export async function getPostsCount() {
  try {
    const posts = await fetchRssPosts();
    return posts.length;
  } catch (error) {
    console.error('Error getting posts count:', error);
    return 0;
  }
}
