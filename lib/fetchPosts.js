import { fetchAPI } from './wordpress';

export async function fetchPosts(params = '') {
  return fetchAPI(`posts?_embed${params}`);
}
