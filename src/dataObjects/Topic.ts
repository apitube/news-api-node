export class Topic {
  constructor(
    public readonly id: string | null,
    public readonly name: string | null,
    public readonly score: number | null,
    public readonly links: Record<string, any> | null,
  ) {}

  static fromArray(data: Record<string, any>): Topic {
    return new Topic(
      data.id ?? null,
      data.name ?? null,
      data.score != null ? Number(data.score) : null,
      data.links ?? null,
    );
  }
}
