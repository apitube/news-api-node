export class Entity {
  constructor(
    public readonly id: string | null,
    public readonly name: string | null,
    public readonly type: string | null,
    public readonly frequency: number | null,
    public readonly titlePositions: number[] | null,
    public readonly bodyPositions: number[] | null,
    public readonly links: Record<string, any> | null,
    public readonly metadata: Record<string, any> | null,
  ) {}

  static fromArray(data: Record<string, any>): Entity {
    return new Entity(
      data.id ?? null,
      data.name ?? null,
      data.type ?? null,
      data.frequency != null ? Number(data.frequency) : null,
      data.title?.pos ?? null,
      data.body?.pos ?? null,
      data.links ?? null,
      data.metadata ?? null,
    );
  }
}
