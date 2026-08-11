import { Client } from '../src/index.js';

const client = new Client({
  apiKey: process.env.APITUBE_API_KEY || 'your-api-key',
  baseUrl: process.env.APITUBE_BASE_URL || 'https://api.apitube.io',
});

// Describe the news in plain language — the API turns the sentence into the regular
// filters before searching and reports what it used in `meta.prompt`.
const response = await client.news('everything', {
  prompt: 'Tesla and Elon Musk news in English for the last 10 days',
  per_page: 5,
});

const prompt = response.meta?.prompt;

if (prompt) {
  console.log('Interpreted as:');

  for (const [key, value] of Object.entries(prompt.applied ?? {})) {
    console.log(`  ${key} = ${value}`);
  }

  for (const item of prompt.ignored ?? []) {
    console.log(`  ignored ${item.field}="${item.value}" (${item.reason})`);
  }

  // Repeating the same wording within 24 hours is served from cache and costs nothing extra.
  console.log(`Cached: ${prompt.cached ? 'yes' : 'no'}\n`);
}

console.log(`Articles found: ${response.articles.length}\n`);

for (const article of response.articles) {
  console.log(`--- ${article.title} ---`);
  console.log(`URL: ${article.url}`);
  console.log(`Source: ${article.source?.domain}`);
  console.log(`Published: ${article.publishedAt}`);
  console.log();
}
