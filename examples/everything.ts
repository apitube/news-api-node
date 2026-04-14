import { Client } from '../src/index.js';

const client = new Client({
  apiKey: process.env.APITUBE_API_KEY || 'your-api-key',
  baseUrl: process.env.APITUBE_BASE_URL || 'https://api.apitube.io',
});

const response = await client.news('everything', {
  title: 'artificial intelligence',
  'language.code': 'en',
  per_page: 5,
});

console.log(`Page: ${response.page}`);
console.log(`Has next page: ${response.hasNextPages ? 'yes' : 'no'}`);
console.log(`Articles found: ${response.articles.length}\n`);

for (const article of response.articles) {
  console.log(`--- ${article.title} ---`);
  console.log(`URL: ${article.url}`);
  console.log(`Source: ${article.source?.domain}`);
  console.log(`Published: ${article.publishedAt}`);
  console.log(`Sentiment: ${article.sentiment?.overall?.polarity}`);

  if (article.categories) {
    const names = article.categories.map((c) => c.name);
    console.log(`Categories: ${names.join(', ')}`);
  }

  console.log();
}
