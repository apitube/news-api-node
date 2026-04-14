import { SentimentValue } from './SentimentValue.js';

export class Sentiment {
  constructor(
    public readonly overall: SentimentValue | null,
    public readonly title: SentimentValue | null,
    public readonly body: SentimentValue | null,
  ) {}

  static fromArray(data: Record<string, any>): Sentiment {
    return new Sentiment(
      data.overall != null ? SentimentValue.fromArray(data.overall) : null,
      data.title != null ? SentimentValue.fromArray(data.title) : null,
      data.body != null ? SentimentValue.fromArray(data.body) : null,
    );
  }
}
