import type { AxiosInstance } from 'axios';
import { Transporter } from './Transporter.js';
import { ApiKey } from './valueObjects/ApiKey.js';
import { BaseUri } from './valueObjects/BaseUri.js';
import { ArticleList } from './responses/ArticleList.js';
import { BalanceResponse } from './responses/BalanceResponse.js';
import { ReferenceList } from './responses/ReferenceList.js';

export interface ClientOptions {
  apiKey: string;
  baseUrl?: string;
  httpClient?: AxiosInstance;
}

export type NewsEndpoint = 'everything' | 'top-headlines' | 'story' | 'article' | 'raw';

export type SuggestType = 'categories' | 'topics' | 'industries' | 'entities';

export class Client {
  private readonly transporter: Transporter;

  constructor(options: ClientOptions) {
    const { apiKey, baseUrl = 'https://api.apitube.io', httpClient } = options;
    this.transporter = new Transporter(new ApiKey(apiKey), new BaseUri(baseUrl), httpClient);
  }

  async ping(): Promise<boolean> {
    try {
      await this.transporter.getRaw('/ping');
      return true;
    } catch {
      return false;
    }
  }

  async balance(): Promise<BalanceResponse> {
    const data = await this.transporter.get('/v1/balance');
    return BalanceResponse.fromArray(data);
  }

  async news(
    endpoint: NewsEndpoint | string,
    params: Record<string, any> = {},
    version: string = 'v1',
  ): Promise<ArticleList> {
    let path: string;
    const body: Record<string, any> = { ...params };

    switch (endpoint) {
      case 'everything':
        path = `/${version}/news/everything`;
        break;
      case 'top-headlines':
        path = `/${version}/news/top-headlines`;
        break;
      case 'story': {
        if (params.id == null) {
          throw new Error('Story endpoint requires an "id" parameter.');
        }
        path = `/${version}/news/story/${params.id}`;
        delete body.id;
        break;
      }
      case 'article':
        path = `/${version}/news/article`;
        break;
      case 'raw':
        path = `/${version}/news/raw`;
        break;
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }

    const data = await this.transporter.post(path, body);
    return ArticleList.fromArray(data);
  }

  /**
   * Count the number of articles matching the given filters.
   * Accepts the same filter parameters as the 'everything' endpoint.
   */
  async count(params: Record<string, any> = {}, version: string = 'v1'): Promise<number> {
    const data = await this.transporter.post(`/${version}/news/count`, { ...params });
    return Number(data.count ?? 0);
  }

  /**
   * Autocomplete suggestions for the given reference type.
   * Supported types: 'categories', 'topics', 'industries', 'entities'.
   */
  async suggest(
    type: SuggestType | string,
    prefix: string,
    version: string = 'v1',
  ): Promise<Record<string, any>[]> {
    const allowed: string[] = ['categories', 'topics', 'industries', 'entities'];
    if (!allowed.includes(type)) {
      throw new Error(`Unknown suggest type: ${type}`);
    }

    const data = await this.transporter.get(`/${version}/suggest/${type}`, { prefix });
    return Array.isArray(data) ? (data as Record<string, any>[]) : [];
  }

  /** List people (newsmakers) tracked by APITube. */
  async people(params: Record<string, any> = {}, version: string = 'v1'): Promise<ReferenceList> {
    return ReferenceList.fromArray(await this.transporter.get(`/${version}/people`, params));
  }

  /** Retrieve a single person profile with coverage statistics. */
  async person(
    id: number | string,
    params: Record<string, any> = {},
    version: string = 'v1',
  ): Promise<Record<string, any>> {
    return this.transporter.get(`/${version}/people/${id}`, params);
  }

  /** List companies tracked by APITube. */
  async companies(params: Record<string, any> = {}, version: string = 'v1'): Promise<ReferenceList> {
    return ReferenceList.fromArray(await this.transporter.get(`/${version}/companies`, params));
  }

  /** Retrieve a single company profile with coverage statistics. */
  async company(
    id: number | string,
    params: Record<string, any> = {},
    version: string = 'v1',
  ): Promise<Record<string, any>> {
    return this.transporter.get(`/${version}/companies/${id}`, params);
  }

  /** List news sources tracked by APITube. */
  async sources(params: Record<string, any> = {}, version: string = 'v1'): Promise<ReferenceList> {
    return ReferenceList.fromArray(await this.transporter.get(`/${version}/sources`, params));
  }

  /** Retrieve a single source profile with coverage statistics. */
  async source(
    id: number | string,
    params: Record<string, any> = {},
    version: string = 'v1',
  ): Promise<Record<string, any>> {
    return this.transporter.get(`/${version}/sources/${id}`, params);
  }

  /** List journalists tracked by APITube. */
  async journalists(params: Record<string, any> = {}, version: string = 'v1'): Promise<ReferenceList> {
    return ReferenceList.fromArray(await this.transporter.get(`/${version}/journalists`, params));
  }

  /** Retrieve a single journalist profile with coverage statistics. */
  async journalist(
    id: number | string,
    params: Record<string, any> = {},
    version: string = 'v1',
  ): Promise<Record<string, any>> {
    return this.transporter.get(`/${version}/journalists/${id}`, params);
  }
}
