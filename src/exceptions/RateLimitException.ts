import { ApiException } from './ApiException.js';

export class RateLimitException extends ApiException {
  public readonly retryAfter: number | null;

  constructor(
    message: string = 'Rate limit exceeded',
    statusCode = 429,
    retryAfter: number | null = null,
    requestId: string | null = null,
  ) {
    super(message, statusCode, requestId);
    this.name = 'RateLimitException';
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
