import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'content'],
      ['dc:creator', 'creator'],
      ['media:content', 'media'],
    ],
  },
});

const RSS_URL = 'https://goal24mm.wordpress.com/feed/';

export async function fetchRssPosts() {
  try {
    const feed = await parser.parseURL(RSS_URL);
    
    return feed.items.map((item) => {
      // Extract image from content if media:content is not available
      let image = null;
      if (item.media && item.media.$ && item.media.$.url) {
        image = item.media.$.url;
      } else {
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        const match = imgRegex.exec(item.content);
        if (match) {
          image = match[1];
        }
      }

      // Create a slug from the link
      const slug = item.link
        .replace('https://goal24mm.wordpress.com/', '')
        .replace(/\/$/, '')
        .split('/')
        .pop();

      return {
        title: item.title,
        slug: slug,
        link: item.link,
        date: item.pubDate,
        excerpt: item.contentSnippet || item.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...',
        content: item.content,
        image: image || '/placeholder-news.jpg',
        categories: item.categories || [],
        creator: item.creator,
      };
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

export async function fetchSingleRssPost(slug) {
  const posts = await fetchRssPosts();
  return posts.find((post) => post.slug === slug);
}
