import { fetchAPI } from './wordpress';

export async function fetchCategories() {
  return fetchAPI('categories');
}
