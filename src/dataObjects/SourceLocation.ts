export class SourceLocation {
  constructor(
    public readonly countryName: string | null,
    public readonly countryCode: string | null,
  ) {}

  static fromArray(data: Record<string, any>): SourceLocation {
    return new SourceLocation(
      data.country_name ?? null,
      data.country_code ?? null,
    );
  }
}
