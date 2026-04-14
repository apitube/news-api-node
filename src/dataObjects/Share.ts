export class Share {
  constructor(
    public readonly total: number | null,
    public readonly facebook: number | null,
    public readonly twitter: number | null,
    public readonly reddit: number | null,
  ) {}

  static fromArray(data: Record<string, any>): Share {
    return new Share(
      data.total != null ? Number(data.total) : null,
      data.facebook != null ? Number(data.facebook) : null,
      data.twitter != null ? Number(data.twitter) : null,
      data.reddit != null ? Number(data.reddit) : null,
    );
  }
}
