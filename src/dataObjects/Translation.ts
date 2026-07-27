export class Translation {
  constructor(
    public readonly title: string | null,
    public readonly description: string | null,
  ) {}

  static fromArray(data: Record<string, any>): Translation {
    return new Translation(data.title ?? null, data.description ?? null);
  }
}
