export class SentimentValue {
  constructor(
    public readonly score: number | null,
    public readonly polarity: string | null,
  ) {}

  static fromArray(data: Record<string, any>): SentimentValue {
    return new SentimentValue(
      data.score != null ? Number(data.score) : null,
      data.polarity ?? null,
    );
  }
}
