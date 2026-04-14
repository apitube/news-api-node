export class Category {
  constructor(
    public readonly id: string | null,
    public readonly name: string | null,
    public readonly score: number | null,
    public readonly taxonomy: string | null,
    public readonly links: Record<string, any> | null,
  ) {}

  static fromArray(data: Record<string, any>): Category {
    return new Category(
      data.id ?? null,
      data.name ?? null,
      data.score != null ? Number(data.score) : null,
      data.taxonomy ?? null,
      data.links ?? null,
    );
  }
}
