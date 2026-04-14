import { Client } from '../src/index.js';

const client = new Client({
  apiKey: process.env.APITUBE_API_KEY || 'your-api-key',
  baseUrl: process.env.APITUBE_BASE_URL || 'https://api.apitube.io',
});

const balance = await client.balance();

console.log(`API Key: ${balance.apiKey}`);
console.log(`Plan: ${balance.plan}`);
console.log(`Points: ${balance.points}`);
