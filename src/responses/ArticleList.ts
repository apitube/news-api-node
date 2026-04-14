import { Article } from './Article.js';

export class ArticleList {
  public readonly articles: Article[];
  public readonly status: string;
  public readonly page: number;
  public readonly limit: number;
  public readonly hasNextPages: boolean;
  public readonly nextPage: string | null;
  public readonly hasPreviousPage: boolean;
  public readonly previousPage: string | null;
  public readonly path: string | null;
  public readonly export: Record<string, any> | null;
  public readonly requestId: string | null;
  public readonly facets: Record<string, any> | null;
  public readonly highlighting: Record<string, any> | null;
  public readonly meta: Record<string, any> | null;
  public readonly headlines: any[] | null;
  public readonly userInput: Record<string, any> | null;

  constructor(init: {
    articles: Article[];
    status: string;
    page: number;
    limit: number;
    hasNextPages: boolean;
    nextPage: string | null;
    hasPreviousPage: boolean;
    previousPage: string | null;
    path: string | null;
    export: Record<string, any> | null;
    requestId: string | null;
    facets: Record<string, any> | null;
    highlighting: Record<string, any> | null;
    meta: Record<string, any> | null;
    headlines: any[] | null;
    userInput: Record<string, any> | null;
  }) {
    this.articles = init.articles;
    this.status = init.status;
    this.page = init.page;
    this.limit = init.limit;
    this.hasNextPages = init.hasNextPages;
    this.nextPage = init.nextPage;
    this.hasPreviousPage = init.hasPreviousPage;
    this.previousPage = init.previousPage;
    this.path = init.path;
    this.export = init.export;
    this.requestId = init.requestId;
    this.facets = init.facets;
    this.highlighting = init.highlighting;
    this.meta = init.meta;
    this.headlines = init.headlines;
    this.userInput = init.userInput;
  }

  static fromArray(data: Record<string, any>): ArticleList {
    const exportField = data.export ?? null;

    return new ArticleList({
      articles: Array.isArray(data.results) ? data.results.map((i: any) => Article.fromArray(i)) : [],
      status: data.status ?? 'ok',
      page: Number(data.page ?? 1),
      limit: Number(data.limit ?? 100),
      hasNextPages: Boolean(data.has_next_pages ?? data.has_next_page ?? false),
      nextPage: data.next_page ?? null,
      hasPreviousPage: Boolean(data.has_previous_page ?? false),
      previousPage: data.previous_page ?? null,
      path: data.path ?? null,
      export: exportField != null && typeof exportField === 'object' ? exportField : null,
      requestId: data.request_id ?? null,
      facets: data.facets ?? null,
      highlighting: data.highlighting ?? null,
      meta: data.meta ?? null,
      headlines: data.headlines ?? null,
      userInput: data.user_input ?? null,
    });
  }
}
