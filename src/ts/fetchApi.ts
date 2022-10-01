const API_URL = 'https://gronagatan.online/graphql';

type QueryOptions = {
  variables?: Record<string, unknown>
}
export async function fetchAPI(query: string, {variables}: QueryOptions = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}