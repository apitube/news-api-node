import { ApiException } from './ApiException.js';

export class AuthenticationException extends ApiException {
  constructor(message: string, statusCode = 401, requestId: string | null = null) {
    super(message, statusCode, requestId);
    this.name = 'AuthenticationException';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
