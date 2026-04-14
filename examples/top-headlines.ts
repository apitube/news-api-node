import { Client } from '../src/index.js';

const client = new Client({
  apiKey: process.env.APITUBE_API_KEY || 'your-api-key',
  baseUrl: process.env.APITUBE_BASE_URL || 'https://api.apitube.io',
});

const response = await client.news('top-headlines', {
  'language.code': 'en',
  per_page: 10,
});

console.log(`Top Headlines (page ${response.page})`);
console.log('='.repeat(40) + '\n');

response.articles.forEach((article, i) => {
  console.log(`${i + 1}. ${article.title}`);
  console.log(`   ${article.source?.domain} | ${article.publishedAt}\n`);
});
