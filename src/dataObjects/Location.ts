export class Location {
  constructor(
    public readonly name: string | null,
    public readonly country: string | null,
    public readonly lat: number | null,
    public readonly lng: number | null,
    public readonly type: string | null,
  ) {}

  static fromArray(data: Record<string, any>): Location {
    return new Location(
      data.name ?? null,
      data.country ?? null,
      data.lat != null ? Number(data.lat) : null,
      data.lng != null ? Number(data.lng) : null,
      data.type ?? null,
    );
  }
}
