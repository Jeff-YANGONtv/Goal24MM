/**
 * WordPress REST API Integration
 * Handles all WordPress API calls with error handling and caching
 */

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://goal24mm.wordpress.com/wp-json/wp/v2';
const CACHE_DURATION = 3600; // 1 hour in seconds

// Simple in-memory cache
const cache = new Map();

/**
 * Get cached data if available
 */
function getCachedData(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION * 1000) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

/**
 * Set cached data
 */
function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Fetch with error handling and retry logic
 */
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Fetch attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}

/**
 * Fetch posts from WordPress
 */
export async function fetchWordPressPosts(options = {}) {
  const cacheKey = `wp-posts-${JSON.stringify(options)}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const params = new URLSearchParams({
      per_page: options.perPage || 10,
      page: options.page || 1,
      orderby: options.orderby || 'date',
      order: options.order || 'desc',
      _embed: true,
      ...options.params,
    });

    const url = `${WORDPRESS_API_URL}/posts?${params}`;
    const data = await fetchWithRetry(url);

    const posts = data.map(transformWordPressPost);
    setCachedData(cacheKey, posts);
    return posts;
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
}

/**
 * Fetch single post from WordPress
 */
export async function fetchWordPressPost(id) {
  const cacheKey = `wp-post-${id}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const url = `${WORDPRESS_API_URL}/posts/${id}?_embed=true`;
    const data = await fetchWithRetry(url);
    const post = transformWordPressPost(data);
    setCachedData(cacheKey, post);
    return post;
  } catch (error) {
    console.error(`Error fetching WordPress post ${id}:`, error);
    return null;
  }
}

/**
 * Fetch categories from WordPress
 */
export async function fetchWordPressCategories() {
  const cacheKey = 'wp-categories';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const url = `${WORDPRESS_API_URL}/categories?per_page=100`;
    const data = await fetchWithRetry(url);
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching WordPress categories:', error);
    return [];
  }
}

/**
 * Fetch posts by category
 */
export async function fetchWordPressPostsByCategory(categoryId, options = {}) {
  const cacheKey = `wp-posts-category-${categoryId}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const params = new URLSearchParams({
      categories: categoryId,
      per_page: options.perPage || 10,
      page: options.page || 1,
      _embed: true,
    });

    const url = `${WORDPRESS_API_URL}/posts?${params}`;
    const data = await fetchWithRetry(url);
    const posts = data.map(transformWordPressPost);
    setCachedData(cacheKey, posts);
    return posts;
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error);
    return [];
  }
}

/**
 * Search WordPress posts
 */
export async function searchWordPressPosts(query, options = {}) {
  try {
    const params = new URLSearchParams({
      search: query,
      per_page: options.perPage || 10,
      page: options.page || 1,
      _embed: true,
    });

    const url = `${WORDPRESS_API_URL}/posts?${params}`;
    const data = await fetchWithRetry(url);
    return data.map(transformWordPressPost);
  } catch (error) {
    console.error('Error searching WordPress posts:', error);
    return [];
  }
}

/**
 * Transform WordPress post to app format
 */
function transformWordPressPost(post) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
  const author = post._embedded?.author?.[0];
  const categories = post._embedded?.['wp:term']?.[0] || [];

  return {
    id: post.id,
    title: post.title?.rendered || 'Untitled',
    slug: post.slug || '',
    excerpt: post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
    content: post.content?.rendered || '',
    date: post.date || new Date().toISOString(),
    modified: post.modified || new Date().toISOString(),
    image: featuredImage?.source_url || '/placeholder-news.jpg',
    author: author?.name || 'Goal24MM',
    authorUrl: author?.link || '',
    categories: categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })),
    link: post.link || '',
    status: post.status || 'publish',
  };
}

/**
 * Clear cache
 */
export function clearWordPressCache() {
  cache.clear();
}

/**
 * Clear specific cache key
 */
export function clearWordPressCacheKey(key) {
  cache.delete(key);
}
