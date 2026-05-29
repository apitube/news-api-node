import { Client } from '../src/index.js';

const client = new Client({
  apiKey: process.env.APITUBE_API_KEY || 'your-api-key',
  baseUrl: process.env.APITUBE_BASE_URL || 'https://api.apitube.io',
});

const response = await client.people({
  name: 'Elon',
  per_page: 5,
});

console.log(`Page: ${response.page}`);
console.log(`Has next page: ${response.hasNextPages ? 'yes' : 'no'}`);
console.log(`People found: ${response.results.length}\n`);

for (const person of response.results) {
  console.log(`--- ${person.name} ---`);
  console.log(`ID: ${person.id}`);
  console.log(`Wikidata: ${person.wikidata_id ?? '-'}\n`);
}

if (response.results.length > 0) {
  const profile = await client.person(response.results[0].id);
  console.log(`Profile of ${profile.name}`);
  console.log(`Articles: ${profile.coverage?.article_count ?? 'n/a'}`);
}
