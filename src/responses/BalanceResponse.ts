export class BalanceResponse {
  constructor(
    public readonly apiKey: string | null,
    public readonly points: number,
    public readonly plan: string | null,
  ) {}

  static fromArray(data: Record<string, any>): BalanceResponse {
    return new BalanceResponse(
      data.api_key ?? data.apiKey ?? null,
      Number(data.points ?? 0),
      data.plan ?? null,
    );
  }
}
