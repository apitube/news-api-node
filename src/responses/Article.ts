import { Author } from '../dataObjects/Author.js';
import { Category } from '../dataObjects/Category.js';
import { Entity } from '../dataObjects/Entity.js';
import { Industry } from '../dataObjects/Industry.js';
import { Link } from '../dataObjects/Link.js';
import { Location } from '../dataObjects/Location.js';
import { Media } from '../dataObjects/Media.js';
import { Readability } from '../dataObjects/Readability.js';
import { Sentiment } from '../dataObjects/Sentiment.js';
import { Share } from '../dataObjects/Share.js';
import { Source } from '../dataObjects/Source.js';
import { Story } from '../dataObjects/Story.js';
import { Summary } from '../dataObjects/Summary.js';
import { Topic } from '../dataObjects/Topic.js';

export class Article {
  constructor(
    public readonly id: string | null,
    public readonly title: string | null,
    public readonly description: string | null,
    public readonly body: string | null,
    public readonly bodyHtml: string | null,
    public readonly url: string | null,
    public readonly image: string | null,
    public readonly publishedAt: string | null,
    public readonly language: string | null,
    public readonly source: Source | null,
    public readonly author: Author | null,
    public readonly categories: Category[] | null,
    public readonly topics: Topic[] | null,
    public readonly industries: Industry[] | null,
    public readonly entities: Entity[] | null,
    public readonly locations: Location[] | null,
    public readonly sentiment: Sentiment | null,
    public readonly readability: Readability | null,
    public readonly summary: Summary[] | null,
    public readonly share: Share | null,
    public readonly media: Media[] | null,
    public readonly links: Link[] | null,
    public readonly story: Story | null,
    public readonly keywords: string[] | null,
    public readonly isDuplicate: boolean | null,
    public readonly isFree: boolean | null,
    public readonly isBreaking: boolean | null,
    public readonly readTime: number | null,
    public readonly sentencesCount: number | null,
    public readonly paragraphsCount: number | null,
    public readonly wordsCount: number | null,
    public readonly charactersCount: number | null,
  ) {}

  static fromArray(data: Record<string, any>): Article {
    const shares = data.shares ?? data.share ?? null;
    const locations = data.locations_mentioned ?? data.locations ?? null;

    return new Article(
      data.id != null ? String(data.id) : null,
      data.title ?? null,
      data.description ?? null,
      data.body ?? null,
      data.body_html ?? null,
      data.href ?? data.url ?? null,
      data.image ?? null,
      data.published_at ?? null,
      data.language ?? null,
      data.source != null ? Source.fromArray(data.source) : null,
      data.author != null ? Author.fromArray(data.author) : null,
      Array.isArray(data.categories) ? data.categories.map((i: any) => Category.fromArray(i)) : null,
      Array.isArray(data.topics) ? data.topics.map((i: any) => Topic.fromArray(i)) : null,
      Array.isArray(data.industries) ? data.industries.map((i: any) => Industry.fromArray(i)) : null,
      Array.isArray(data.entities) ? data.entities.map((i: any) => Entity.fromArray(i)) : null,
      Array.isArray(locations) ? locations.map((i: any) => Location.fromArray(i)) : null,
      data.sentiment != null ? Sentiment.fromArray(data.sentiment) : null,
      data.readability != null ? Readability.fromArray(data.readability) : null,
      Array.isArray(data.summary) ? data.summary.map((i: any) => Summary.fromArray(i)) : null,
      shares != null && typeof shares === 'object' && !Array.isArray(shares) ? Share.fromArray(shares) : null,
      Array.isArray(data.media) ? data.media.map((i: any) => Media.fromArray(i)) : null,
      Array.isArray(data.links) ? data.links.map((i: any) => Link.fromArray(i)) : null,
      data.story != null ? Story.fromArray(data.story) : null,
      data.keywords ?? null,
      data.is_duplicate != null ? Boolean(data.is_duplicate) : null,
      data.is_free != null ? Boolean(data.is_free) : null,
      data.is_breaking != null ? Boolean(data.is_breaking) : null,
      data.read_time != null ? Number(data.read_time) : null,
      data.sentences_count != null ? Number(data.sentences_count) : null,
      data.paragraphs_count != null ? Number(data.paragraphs_count) : null,
      data.words_count != null ? Number(data.words_count) : null,
      data.characters_count != null ? Number(data.characters_count) : null,
    );
  }
}
