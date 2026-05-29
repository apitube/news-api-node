import { Client } from '../src/index.js';

const client = new Client({
  apiKey: process.env.APITUBE_API_KEY || 'your-api-key',
  baseUrl: process.env.APITUBE_BASE_URL || 'https://api.apitube.io',
});

const count = await client.count({
  title: 'artificial intelligence',
  'language.code': 'en',
});

console.log(`Matching articles: ${count}`);
