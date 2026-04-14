export class Story {
  constructor(
    public readonly id: string | null,
    public readonly uri: string | null,
  ) {}

  static fromArray(data: Record<string, any>): Story {
    return new Story(
      data.id ?? null,
      data.uri ?? null,
    );
  }
}
