export class Industry {
  constructor(
    public readonly id: string | null,
    public readonly name: string | null,
    public readonly links: Record<string, any> | null,
  ) {}

  static fromArray(data: Record<string, any>): Industry {
    return new Industry(
      data.id ?? null,
      data.name ?? null,
      data.links ?? null,
    );
  }
}
