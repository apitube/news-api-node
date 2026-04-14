export class ApiException extends Error {
  public readonly statusCode: number;
  public readonly requestId: string | null;

  constructor(message: string, statusCode = 0, requestId: string | null = null) {
    super(message);
    this.name = 'ApiException';
    this.statusCode = statusCode;
    this.requestId = requestId;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  get code(): number {
    return this.statusCode;
  }
}
