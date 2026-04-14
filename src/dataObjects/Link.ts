export class Link {
  constructor(
    public readonly url: string | null,
    public readonly type: string | null,
  ) {}

  static fromArray(data: Record<string, any>): Link {
    return new Link(
      data.url ?? null,
      data.type ?? null,
    );
  }
}
