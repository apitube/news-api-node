import { Client } from '../src/index.js';

const client = new Client({
  apiKey: process.env.APITUBE_API_KEY || 'your-api-key',
  baseUrl: process.env.APITUBE_BASE_URL || 'https://api.apitube.io',
});

const isAvailable = await client.ping();

console.log('API status: ' + (isAvailable ? 'available' : 'unavailable'));
