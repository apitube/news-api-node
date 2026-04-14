import { Client } from '../src/index.js';

const client = new Client({
  apiKey: process.env.APITUBE_API_KEY || 'your-api-key',
  baseUrl: process.env.APITUBE_BASE_URL || 'https://api.apitube.io',
});

const storyId = process.argv[2] ?? 'example-story-id';

const response = await client.news('story', {
  id: storyId,
});

console.log(`Story: ${storyId}`);
console.log(`Articles in story: ${response.articles.length}\n`);

for (const article of response.articles) {
  console.log(`- ${article.title}`);
  console.log(`  ${article.url}\n`);
}
