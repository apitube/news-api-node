import { Client } from '../src/index.js';

const client = new Client({
  apiKey: process.env.APITUBE_API_KEY || 'your-api-key',
  baseUrl: process.env.APITUBE_BASE_URL || 'https://api.apitube.io',
});

const articleId = process.argv[2] ?? '12345';

const response = await client.news('article', {
  id: articleId,
});

for (const article of response.articles) {
  console.log(`Title: ${article.title}`);
  console.log(`Description: ${article.description}`);
  console.log(`URL: ${article.url}`);
  console.log(`Language: ${article.language}`);
  console.log(`Published: ${article.publishedAt}\n`);

  if (article.source) {
    console.log(`Source: ${article.source.domain}`);
    console.log(`Source type: ${article.source.type}`);
    console.log(`Source bias: ${article.source.bias}\n`);
  }

  if (article.sentiment) {
    console.log('Sentiment:');
    console.log(`  Overall: ${article.sentiment.overall?.polarity} (${article.sentiment.overall?.score})`);
    console.log(`  Title: ${article.sentiment.title?.polarity} (${article.sentiment.title?.score})`);
    console.log(`  Body: ${article.sentiment.body?.polarity} (${article.sentiment.body?.score})\n`);
  }

  if (article.entities) {
    console.log('Entities:');
    for (const entity of article.entities) {
      console.log(`  - ${entity.name} (${entity.type}, freq: ${entity.frequency})`);
    }
  }
}
