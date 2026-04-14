export class Media {
  constructor(
    public readonly url: string | null,
    public readonly type: string | null,
  ) {}

  static fromArray(data: Record<string, any>): Media {
    return new Media(
      data.url ?? null,
      data.type ?? null,
    );
  }
}
