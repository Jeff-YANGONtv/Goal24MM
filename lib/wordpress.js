const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export async function fetchAPI(endpoint) {
  const res = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`);
  if (!res.ok) throw new Error('Failed to fetch API');
  return res.json();
}
