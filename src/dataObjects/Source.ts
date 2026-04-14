import { SourceLocation } from './SourceLocation.js';
import { SourceRankings } from './SourceRankings.js';

export class Source {
  constructor(
    public readonly id: string | null,
    public readonly domain: string | null,
    public readonly homePageUrl: string | null,
    public readonly type: string | null,
    public readonly bias: string | null,
    public readonly rankings: SourceRankings | null,
    public readonly location: SourceLocation | null,
    public readonly favicon: string | null,
  ) {}

  static fromArray(data: Record<string, any>): Source {
    return new Source(
      data.id ?? null,
      data.domain ?? null,
      data.home_page_url ?? null,
      data.type ?? null,
      data.bias ?? null,
      data.rankings != null ? SourceRankings.fromArray(data.rankings) : null,
      data.location != null ? SourceLocation.fromArray(data.location) : null,
      data.favicon ?? null,
    );
  }
}
