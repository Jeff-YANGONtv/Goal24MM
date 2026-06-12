import { fetchAPI } from './wordpress';

export async function fetchSinglePost(slug) {
  const posts = await fetchAPI(`posts?slug=${slug}&_embed`);
  return posts[0];
}
