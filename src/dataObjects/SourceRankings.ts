export class SourceRankings {
  constructor(
    public readonly opr: number | null,
  ) {}

  static fromArray(data: Record<string, any>): SourceRankings {
    return new SourceRankings(
      data.opr != null ? Number(data.opr) : null,
    );
  }
}
