/**
 * Paginated list of reference entities (people, companies, sources, journalists).
 *
 * The pagination metadata is typed, while each result item is kept as a raw
 * object since reference payloads vary by entity type.
 */
export class ReferenceList {
  public readonly results: Record<string, any>[];
  public readonly status: string;
  public readonly page: number;
  public readonly limit: number;
  public readonly hasNextPages: boolean;

  constructor(init: {
    results: Record<string, any>[];
    status: string;
    page: number;
    limit: number;
    hasNextPages: boolean;
  }) {
    this.results = init.results;
    this.status = init.status;
    this.page = init.page;
    this.limit = init.limit;
    this.hasNextPages = init.hasNextPages;
  }

  static fromArray(data: Record<string, any>): ReferenceList {
    return new ReferenceList({
      results: Array.isArray(data.results) ? data.results : [],
      status: data.status ?? 'ok',
      page: Number(data.page ?? 1),
      limit: Number(data.limit ?? 100),
      hasNextPages: Boolean(data.has_next_pages ?? data.has_next_page ?? false),
    });
  }
}
