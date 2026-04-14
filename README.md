# APITube News API Node.js SDK

Node.js/TypeScript SDK for the [APITube News API](https://apitube.io) — access global news articles, headlines, stories, sentiment analysis, and more.

- [API Documentation](https://docs.apitube.io/)
- [Website](https://apitube.io)
- [More examples](https://github.com/apitube/news-api-workflows)
- [Cookbook](https://apitube.io/cookbook)

## Requirements

- Node.js 18+
- TypeScript 5+ (optional, fully typed)

## Installation

```bash
npm install @apitube/news-api
```

## Quick Start

```ts
import { Client } from '@apitube/news-api';

const client = new Client({ apiKey: 'your-api-key' });

// Search news articles
const response = await client.news('everything', {
  title: 'artificial intelligence',
  'language.code': 'en',
  per_page: 5,
});

for (const article of response.articles) {
  console.log(article.title);
  console.log(article.url);
}
```

## Usage

### Initialize the client

```ts
import { Client } from '@apitube/news-api';

const client = new Client({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.apitube.io', // optional, default value
});
```

You can pass a custom axios instance:

```ts
import axios from 'axios';
import { Client } from '@apitube/news-api';

const httpClient = axios.create({ timeout: 30_000 });
const client = new Client({ apiKey: 'your-api-key', httpClient });
```

### Search articles

```ts
const response = await client.news('everything', {
  title: 'climate change',
  'language.code': 'en',
  per_page: 10,
});

console.log(`Page: ${response.page}`);
console.log(`Has next page: ${response.hasNextPages ? 'yes' : 'no'}`);

for (const article of response.articles) {
  console.log(article.title);
  console.log(`Source: ${article.source?.domain}`);
  console.log(`Sentiment: ${article.sentiment?.overall?.polarity}`);
}
```

### Specify API version

```ts
const response = await client.news('everything', {
  title: 'artificial intelligence',
  per_page: 5,
}, 'v1');
```

By default, the SDK uses `v1`.

### Top headlines

```ts
const response = await client.news('top-headlines', {
  'language.code': 'en',
  per_page: 10,
});

for (const article of response.articles) {
  console.log(`${article.title} — ${article.source?.domain}`);
}
```

### Get a single article

```ts
const response = await client.news('article', { id: 'article-id' });
const article = response.articles[0];
console.log(article.title);
console.log(article.body);
```

### Get articles by story

```ts
const response = await client.news('story', { id: 'story-id' });
for (const article of response.articles) {
  console.log(article.title);
}
```

### Check balance

```ts
const balance = await client.balance();
console.log(`Plan: ${balance.plan}`);
console.log(`Points: ${balance.points}`);
```

### Ping

```ts
const isAvailable = await client.ping();
console.log(isAvailable ? 'API is available' : 'API is unavailable');
```

## Error Handling

```ts
import {
  ApiException,
  AuthenticationException,
  RateLimitException,
} from '@apitube/news-api';

try {
  const response = await client.news('everything', { title: 'node' });
} catch (e) {
  if (e instanceof AuthenticationException) {
    console.log(`Auth error: ${e.message}`);
  } else if (e instanceof RateLimitException) {
    console.log(`Rate limited. Retry after: ${e.retryAfter} seconds`);
  } else if (e instanceof ApiException) {
    console.log(`API error (${e.statusCode}): ${e.message}`);
    console.log(`Request ID: ${e.requestId}`);
  }
}
```

## Testing

```bash
npm install
npm test
```

## License

MIT
