import type { AxiosInstance } from 'axios';
import { Transporter } from './Transporter.js';
import { ApiKey } from './valueObjects/ApiKey.js';
import { BaseUri } from './valueObjects/BaseUri.js';
import { ArticleList } from './responses/ArticleList.js';
import { BalanceResponse } from './responses/BalanceResponse.js';

export interface ClientOptions {
  apiKey: string;
  baseUrl?: string;
  httpClient?: AxiosInstance;
}

export type NewsEndpoint = 'everything' | 'top-headlines' | 'story' | 'article';

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
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }

    const data = await this.transporter.post(path, body);
    return ArticleList.fromArray(data);
  }
}
