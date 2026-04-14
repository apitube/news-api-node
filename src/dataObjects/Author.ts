export class Author {
  constructor(
    public readonly id: string | null,
    public readonly name: string | null,
  ) {}

  static fromArray(data: Record<string, any>): Author {
    return new Author(
      data.id ?? null,
      data.name ?? null,
    );
  }
}
