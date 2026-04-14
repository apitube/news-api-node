import { describe, test, expect } from 'vitest';
import { Article } from '../../src/responses/Article.js';
import { ArticleList } from '../../src/responses/ArticleList.js';

describe('ArticleList.fromArray', () => {
  test('maps results to articles', () => {
    const data = {
      status: 'ok',
      results: [
        { id: 'art-1', title: 'First' },
        { id: 'art-2', title: 'Second' },
        { id: 'art-3', title: 'Third' },
      ],
      page: 2,
      limit: 100,
      has_next_pages: true,
      next_page: 'https://api.apitube.io/v1/news/everything?page=3',
      has_previous_page: true,
      previous_page: 'https://api.apitube.io/v1/news/everything?page=1',
      path: '/v1/news/everything',
      export: {
        json: 'https://api.apitube.io/export/123.json',
        csv: 'https://api.apitube.io/export/123.csv',
      },
      request_id: 'req-456',
      facets: { 'source.id': [{ value: 'src-1', count: 10 }] },
      highlighting: { 'art-1': { title: ['<em>First</em>'] } },
      meta: { total: 300 },
      headlines: ['Breaking: Major Event', 'Tech Update'],
      user_input: { query: 'test', filters: [] },
    };

    const list = ArticleList.fromArray(data);

    expect(list.articles).toHaveLength(3);
    list.articles.forEach((a) => expect(a).toBeInstanceOf(Article));
    expect(list.articles[0].id).toBe('art-1');
    expect(list.articles[1].title).toBe('Second');
    expect(list.status).toBe('ok');
    expect(list.page).toBe(2);
    expect(list.limit).toBe(100);
    expect(list.hasNextPages).toBe(true);
    expect(list.nextPage).toBe('https://api.apitube.io/v1/news/everything?page=3');
    expect(list.hasPreviousPage).toBe(true);
    expect(list.previousPage).toBe('https://api.apitube.io/v1/news/everything?page=1');
    expect(list.path).toBe('/v1/news/everything');
    expect(typeof list.export).toBe('object');
    expect(list.export?.json).toBe('https://api.apitube.io/export/123.json');
    expect(list.requestId).toBe('req-456');
    expect(typeof list.facets).toBe('object');
    expect(typeof list.highlighting).toBe('object');
    expect(typeof list.meta).toBe('object');
    expect(list.headlines).toEqual(['Breaking: Major Event', 'Tech Update']);
    expect(list.userInput).toEqual({ query: 'test', filters: [] });
  });

  test('empty results', () => {
    const list = ArticleList.fromArray({
      results: [],
      page: 1,
      has_next_pages: false,
    });

    expect(list.articles).toHaveLength(0);
    expect(list.status).toBe('ok');
    expect(list.page).toBe(1);
    expect(list.limit).toBe(100);
    expect(list.hasNextPages).toBe(false);
    expect(list.export).toBeNull();
    expect(list.requestId).toBeNull();
    expect(list.facets).toBeNull();
  });

  test('missing results key', () => {
    const list = ArticleList.fromArray({});

    expect(list.articles).toHaveLength(0);
    expect(list.page).toBe(1);
    expect(list.hasNextPages).toBe(false);
  });
});
