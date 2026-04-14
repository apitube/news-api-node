import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { ApiException } from './exceptions/ApiException.js';
import { AuthenticationException } from './exceptions/AuthenticationException.js';
import { RateLimitException } from './exceptions/RateLimitException.js';
import { ApiKey } from './valueObjects/ApiKey.js';
import { BaseUri } from './valueObjects/BaseUri.js';

export class Transporter {
  private readonly apiKey: ApiKey;
  private readonly baseUri: BaseUri;
  private readonly client: AxiosInstance;

  constructor(apiKey: ApiKey, baseUri: BaseUri, client?: AxiosInstance) {
    this.apiKey = apiKey;
    this.baseUri = baseUri;
    this.client = client ?? axios.create();
  }

  async get(path: string): Promise<Record<string, any>> {
    const response = await this.client.request({
      method: 'GET',
      url: this.baseUri.toString() + path,
      headers: {
        'X-API-Key': this.apiKey.toString(),
        Accept: 'application/json',
      },
      validateStatus: () => true,
      transformResponse: (v) => v,
    });

    return this.handleJsonResponse(response);
  }

  async post(path: string, body: Record<string, any> = {}): Promise<Record<string, any>> {
    const response = await this.client.request({
      method: 'POST',
      url: this.baseUri.toString() + path,
      headers: {
        'X-API-Key': this.apiKey.toString(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
      validateStatus: () => true,
      transformRequest: (v) => v,
      transformResponse: (v) => v,
    });

    return this.handleJsonResponse(response);
  }

  async getRaw(path: string): Promise<string> {
    const response = await this.client.request({
      method: 'GET',
      url: this.baseUri.toString() + path,
      headers: {
        'X-API-Key': this.apiKey.toString(),
      },
      validateStatus: () => true,
      transformResponse: (v) => v,
    });

    const status = response.status;
    if (status >= 200 && status < 300) {
      return String(response.data ?? '');
    }

    this.throwForStatus(response);
  }

  private handleJsonResponse(response: AxiosResponse): Record<string, any> {
    const status = response.status;
    const raw = typeof response.data === 'string' ? response.data : '';

    if (status >= 200 && status < 300) {
      if (raw === '') {
        return {};
      }
      try {
        return JSON.parse(raw);
      } catch (err) {
        throw new SyntaxError(`Invalid JSON in response: ${(err as Error).message}`);
      }
    }

    this.throwForStatus(response);
  }

  private throwForStatus(response: AxiosResponse): never {
    const status = response.status;
    const raw = typeof response.data === 'string' ? response.data : '';
    let data: Record<string, any> = {};
    if (raw !== '') {
      try {
        const parsed = JSON.parse(raw);
        if (parsed != null && typeof parsed === 'object') {
          data = parsed;
        }
      } catch {
        data = {};
      }
    }

    const message = data.message ?? data.error ?? `API error: HTTP ${status}`;
    const requestId = data.request_id ?? null;

    if (status === 401) {
      throw new AuthenticationException(message, status, requestId);
    }
    if (status === 429) {
      const retryAfterHeader = this.getHeader(response, 'retry-after');
      const retryAfter = retryAfterHeader != null ? parseInt(retryAfterHeader, 10) : null;
      throw new RateLimitException(
        message,
        status,
        Number.isNaN(retryAfter as number) ? null : retryAfter,
        requestId,
      );
    }
    throw new ApiException(message, status, requestId);
  }

  private getHeader(response: AxiosResponse, name: string): string | null {
    const headers = response.headers;
    if (!headers) return null;
    const lower = name.toLowerCase();
    for (const key of Object.keys(headers)) {
      if (key.toLowerCase() === lower) {
        const v = (headers as any)[key];
        if (Array.isArray(v)) return v[0] ?? null;
        return v != null ? String(v) : null;
      }
    }
    return null;
  }
}

