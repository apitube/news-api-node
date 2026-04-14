import { SentimentValue } from './SentimentValue.js';

export class Summary {
  constructor(
    public readonly sentence: string | null,
    public readonly sentiment: SentimentValue | null,
  ) {}

  static fromArray(data: Record<string, any>): Summary {
    return new Summary(
      data.sentence ?? null,
      data.sentiment != null ? SentimentValue.fromArray(data.sentiment) : null,
    );
  }
}
