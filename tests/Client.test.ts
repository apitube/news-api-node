import { describe, test, expect, beforeEach } from 'vitest';
import axios, { type AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Client } from '../src/Client.js';
import { AuthenticationException } from '../src/exceptions/AuthenticationException.js';
import { RateLimitException } from '../src/exceptions/RateLimitException.js';

describe('Client', () => {
  let mock: MockAdapter;
  let httpClient: AxiosInstance;
  let client: Client;

  beforeEach(() => {
    httpClient = axios.create();
    mock = new MockAdapter(httpClient);
    client = new Client({
      apiKey: 'test-key',
      baseUrl: 'https://api.apitube.io',
      httpClient,
    });
  });

  test('ping returns true', async () => {
    mock.onGet('https://api.apitube.io/ping').reply(200, 'pong');
    expect(await client.ping()).toBe(true);
  });

  test('ping returns false on error', async () => {
    mock.onGet('https://api.apitube.io/ping').reply(500, 'Internal Server Error');
    expect(await client.ping()).toBe(false);
  });

  test('balance', async () => {
    mock.onGet('https://api.apitube.io/v1/balance').reply(
      200,
      JSON.stringify({
        api_key: 'test-key',
        points: 1500,
        plan: 'pro',
      }),
      { 'Content-Type': 'application/json' },
    );

    const balance = await client.balance();
    expect(balance.apiKey).toBe('test-key');
    expect(balance.points).toBe(1500);
    expect(balance.plan).toBe('pro');
  });

  test('news everything', async () => {
    mock.onPost('https://api.apitube.io/v1/news/everything').reply(
      200,
      JSON.stringify({
        results: [
          {
            id: 'art-1',
            title: 'AI advances',
            source: { domain: 'example.com' },
            sentiment: {
              overall: { score: 0.8, polarity: 'positive' },
            },
          },
        ],
        page: 1,
        has_next_pages: true,
        request_id: 'req-123',
      }),
      { 'Content-Type': 'application/json' },
    );

    const response = await client.news('everything', { title: 'AI' });

    expect(response.articles).toHaveLength(1);
    expect(response.articles[0].id).toBe('art-1');
    expect(response.articles[0].title).toBe('AI advances');
    expect(response.articles[0].source?.domain).toBe('example.com');
    expect(response.articles[0].sentiment?.overall?.polarity).toBe('positive');
    expect(response.page).toBe(1);
    expect(response.hasNextPages).toBe(true);
    expect(response.requestId).toBe('req-123');
  });

  test('news top-headlines', async () => {
    mock.onPost('https://api.apitube.io/v1/news/top-headlines').reply(
      200,
      JSON.stringify({
        results: [{ id: 'art-2', title: 'Breaking news' }],
        page: 1,
        has_next_pages: false,
      }),
      { 'Content-Type': 'application/json' },
    );

    const response = await client.news('top-headlines', { 'language.code': 'en' });
    expect(response.articles).toHaveLength(1);
    expect(response.articles[0].title).toBe('Breaking news');
    expect(response.hasNextPages).toBe(false);
  });

  test('news story', async () => {
    mock.onPost('https://api.apitube.io/v1/news/story/story-abc').reply(
      200,
      JSON.stringify({
        results: [],
        page: 1,
        has_next_pages: false,
      }),
      { 'Content-Type': 'application/json' },
    );

    await client.news('story', { id: 'story-abc' });

    const lastRequest = mock.history.post[mock.history.post.length - 1];
    expect(lastRequest.url).toContain('/v1/news/story/story-abc');
    expect(lastRequest.method?.toUpperCase()).toBe('POST');

    const body = JSON.parse(lastRequest.data);
    expect(body).not.toHaveProperty('id');
  });

  test('news story without id throws', async () => {
    await expect(client.news('story', {})).rejects.toThrow(
      'Story endpoint requires an "id" parameter.',
    );
  });

  test('news article', async () => {
    mock.onPost('https://api.apitube.io/v1/news/article').reply(
      200,
      JSON.stringify({
        results: [{ id: 'art-3', title: 'Specific article' }],
        page: 1,
        has_next_pages: false,
      }),
      { 'Content-Type': 'application/json' },
    );

    const response = await client.news('article', { url: 'https://example.com/article' });
    expect(response.articles).toHaveLength(1);
    expect(response.articles[0].title).toBe('Specific article');
  });

  test('news invalid endpoint throws', async () => {
    await expect(client.news('invalid')).rejects.toThrow('Unknown endpoint: invalid');
  });

  test('authentication exception on 401', async () => {
    mock.onGet('https://api.apitube.io/v1/balance').reply(
      401,
      JSON.stringify({ message: 'Invalid API key' }),
    );

    await expect(client.balance()).rejects.toBeInstanceOf(AuthenticationException);
    await expect(client.balance()).rejects.toThrow('Invalid API key');
  });

  test('rate limit exception on 429', async () => {
    mock.onGet('https://api.apitube.io/v1/balance').reply(
      429,
      JSON.stringify({ message: 'Rate limit exceeded' }),
      { 'Retry-After': '60' },
    );

    try {
      await client.balance();
      throw new Error('Expected RateLimitException');
    } catch (e) {
      expect(e).toBeInstanceOf(RateLimitException);
      const err = e as RateLimitException;
      expect(err.message).toBe('Rate limit exceeded');
      expect(err.retryAfter).toBe(60);
    }
  });

  test('request has api key header', async () => {
    mock.onGet('https://api.apitube.io/v1/balance').reply(
      200,
      JSON.stringify({ api_key: 'test-key', points: 100, plan: 'free' }),
    );

    await client.balance();

    const lastRequest = mock.history.get[mock.history.get.length - 1];
    expect(lastRequest.headers?.['X-API-Key']).toBe('test-key');
  });

  test('news with custom version', async () => {
    mock.onPost('https://api.apitube.io/v1/news/everything').reply(
      200,
      JSON.stringify({
        results: [{ id: 'art-v2', title: 'V2 article' }],
        page: 1,
        has_next_pages: false,
      }),
      { 'Content-Type': 'application/json' },
    );

    await client.news('everything', { title: 'test' }, 'v1');

    const lastRequest = mock.history.post[mock.history.post.length - 1];
    expect(lastRequest.url).toContain('/v1/news/everything');
  });

  test('post request has json content type', async () => {
    mock.onPost('https://api.apitube.io/v1/news/everything').reply(
      200,
      JSON.stringify({ results: [], page: 1, has_next_pages: false }),
    );

    await client.news('everything', { title: 'test' });

    const lastRequest = mock.history.post[mock.history.post.length - 1];
    expect(lastRequest.headers?.['Content-Type']).toBe('application/json');
    expect(lastRequest.method?.toUpperCase()).toBe('POST');
  });
});
