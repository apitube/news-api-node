import { describe, test, expect } from 'vitest';
import { Article } from '../../src/responses/Article.js';
import { Author } from '../../src/dataObjects/Author.js';
import { Category } from '../../src/dataObjects/Category.js';
import { Entity } from '../../src/dataObjects/Entity.js';
import { Industry } from '../../src/dataObjects/Industry.js';
import { Link } from '../../src/dataObjects/Link.js';
import { Location } from '../../src/dataObjects/Location.js';
import { Media } from '../../src/dataObjects/Media.js';
import { Readability } from '../../src/dataObjects/Readability.js';
import { Sentiment } from '../../src/dataObjects/Sentiment.js';
import { Share } from '../../src/dataObjects/Share.js';
import { Source } from '../../src/dataObjects/Source.js';
import { Story } from '../../src/dataObjects/Story.js';
import { Summary } from '../../src/dataObjects/Summary.js';
import { Topic } from '../../src/dataObjects/Topic.js';

describe('Article.fromArray', () => {
  test('full', () => {
    const data = {
      id: 123,
      title: 'AI Revolution',
      description: 'An article about AI',
      body: 'Full article body here...',
      body_html: '<p>Full article body here...</p>',
      href: 'https://example.com/ai-revolution',
      image: 'https://example.com/image.jpg',
      published_at: '2026-01-15T10:30:00Z',
      language: 'en',
      source: {
        id: 'src-1',
        domain: 'example.com',
        home_page_url: 'https://example.com',
        type: 'news',
        bias: 'center',
        rankings: { opr: 85.5 },
        location: { country_name: 'United States', country_code: 'US' },
        favicon: 'https://example.com/favicon.ico',
      },
      author: { id: 'auth-1', name: 'John Doe' },
      categories: [
        { id: 'cat-1', name: 'Technology', score: 0.95, taxonomy: 'iab', links: { self: '/categories/cat-1' } },
      ],
      topics: [
        { id: 'top-1', name: 'Artificial Intelligence', score: 0.9, links: { self: '/topics/top-1' } },
      ],
      industries: [
        { id: 'ind-1', name: 'Software', links: { self: '/industries/ind-1' } },
      ],
      entities: [
        {
          id: 'ent-1',
          name: 'OpenAI',
          type: 'organization',
          frequency: 5,
          title: { pos: [0, 15] },
          body: { pos: [10, 45, 120] },
          links: {
            self: '/entities/ent-1',
            wikipedia: 'https://en.wikipedia.org/wiki/OpenAI',
            wikidata: 'https://www.wikidata.org/wiki/Q21055863',
          },
          metadata: { founded: '2015' },
        },
      ],
      locations_mentioned: [
        { name: 'San Francisco', country: 'US', lat: 37.77, lng: -122.42, type: 'city' },
      ],
      sentiment: {
        overall: { score: 0.8, polarity: 'positive' },
        title: { score: 0.7, polarity: 'positive' },
        body: { score: 0.85, polarity: 'positive' },
      },
      readability: {
        flesch_kincaid_grade: 12.5,
        flesch_reading_ease: 45.2,
        automated_readability_index: 14.5,
        difficulty_level: 'advanced',
        target_audience: 'professional',
        reading_age: 18.0,
        avg_words_per_sentence: 22.5,
        avg_syllables_per_word: 1.8,
      },
      summary: [
        { sentence: 'AI is transforming the world.', sentiment: { score: 0.9, polarity: 'positive' } },
      ],
      shares: { total: 1500, facebook: 800, twitter: 500, reddit: 200 },
      media: [{ url: 'https://example.com/video.mp4', type: 'video' }],
      links: [{ url: 'https://related.com/article', type: 'related' }],
      story: { id: 'story-1', uri: 'https://example.com/story/1' },
      keywords: ['AI', 'machine learning', 'technology'],
      is_duplicate: false,
      is_free: true,
      is_breaking: false,
      read_time: 5,
      sentences_count: 42,
      paragraphs_count: 8,
      words_count: 1200,
      characters_count: 7500,
    };

    const article = Article.fromArray(data);

    expect(article.id).toBe('123');
    expect(article.title).toBe('AI Revolution');
    expect(article.description).toBe('An article about AI');
    expect(article.body).toBe('Full article body here...');
    expect(article.bodyHtml).toBe('<p>Full article body here...</p>');
    expect(article.url).toBe('https://example.com/ai-revolution');
    expect(article.image).toBe('https://example.com/image.jpg');
    expect(article.publishedAt).toBe('2026-01-15T10:30:00Z');
    expect(article.language).toBe('en');

    expect(article.source).toBeInstanceOf(Source);
    expect(article.source?.domain).toBe('example.com');
    expect(article.source?.homePageUrl).toBe('https://example.com');
    expect(article.source?.rankings?.opr).toBe(85.5);
    expect(article.source?.location?.countryCode).toBe('US');

    expect(article.author).toBeInstanceOf(Author);
    expect(article.author?.name).toBe('John Doe');

    expect(article.categories).toHaveLength(1);
    expect(article.categories![0]).toBeInstanceOf(Category);
    expect(article.categories![0].name).toBe('Technology');
    expect(article.categories![0].score).toBe(0.95);
    expect(article.categories![0].links).toEqual({ self: '/categories/cat-1' });

    expect(article.topics).toHaveLength(1);
    expect(article.topics![0]).toBeInstanceOf(Topic);
    expect(article.topics![0].name).toBe('Artificial Intelligence');
    expect(article.topics![0].links).toEqual({ self: '/topics/top-1' });

    expect(article.industries).toHaveLength(1);
    expect(article.industries![0]).toBeInstanceOf(Industry);
    expect(article.industries![0].name).toBe('Software');
    expect(article.industries![0].links).toEqual({ self: '/industries/ind-1' });

    expect(article.entities).toHaveLength(1);
    expect(article.entities![0]).toBeInstanceOf(Entity);
    expect(article.entities![0].name).toBe('OpenAI');
    expect(article.entities![0].frequency).toBe(5);
    expect(article.entities![0].titlePositions).toEqual([0, 15]);
    expect(article.entities![0].bodyPositions).toEqual([10, 45, 120]);
    expect(article.entities![0].links?.wikipedia).toBe('https://en.wikipedia.org/wiki/OpenAI');
    expect(article.entities![0].metadata).toEqual({ founded: '2015' });

    expect(article.locations).toHaveLength(1);
    expect(article.locations![0]).toBeInstanceOf(Location);
    expect(article.locations![0].name).toBe('San Francisco');
    expect(article.locations![0].lat).toBe(37.77);

    expect(article.sentiment).toBeInstanceOf(Sentiment);
    expect(article.sentiment?.overall?.score).toBe(0.8);
    expect(article.sentiment?.overall?.polarity).toBe('positive');
    expect(article.sentiment?.title?.score).toBe(0.7);

    expect(article.readability).toBeInstanceOf(Readability);
    expect(article.readability?.fleschKincaidGrade).toBe(12.5);
    expect(article.readability?.fleschReadingEase).toBe(45.2);
    expect(article.readability?.automatedReadabilityIndex).toBe(14.5);
    expect(article.readability?.difficultyLevel).toBe('advanced');
    expect(article.readability?.targetAudience).toBe('professional');
    expect(article.readability?.readingAge).toBe(18.0);
    expect(article.readability?.avgWordsPerSentence).toBe(22.5);
    expect(article.readability?.avgSyllablesPerWord).toBe(1.8);

    expect(article.summary).toHaveLength(1);
    expect(article.summary![0]).toBeInstanceOf(Summary);
    expect(article.summary![0].sentence).toBe('AI is transforming the world.');
    expect(article.summary![0].sentiment?.polarity).toBe('positive');

    expect(article.share).toBeInstanceOf(Share);
    expect(article.share?.total).toBe(1500);
    expect(article.share?.facebook).toBe(800);

    expect(article.media).toHaveLength(1);
    expect(article.media![0]).toBeInstanceOf(Media);
    expect(article.media![0].type).toBe('video');

    expect(article.links).toHaveLength(1);
    expect(article.links![0]).toBeInstanceOf(Link);
    expect(article.links![0].type).toBe('related');

    expect(article.story).toBeInstanceOf(Story);
    expect(article.story?.id).toBe('story-1');

    expect(article.keywords).toEqual(['AI', 'machine learning', 'technology']);
    expect(article.isDuplicate).toBe(false);
    expect(article.isFree).toBe(true);
    expect(article.isBreaking).toBe(false);
    expect(article.readTime).toBe(5);
    expect(article.sentencesCount).toBe(42);
    expect(article.paragraphsCount).toBe(8);
    expect(article.wordsCount).toBe(1200);
    expect(article.charactersCount).toBe(7500);
  });

  test('minimal', () => {
    const article = Article.fromArray({
      id: 'art-min',
      title: 'Minimal article',
    });

    expect(article.id).toBe('art-min');
    expect(article.title).toBe('Minimal article');
    expect(article.description).toBeNull();
    expect(article.body).toBeNull();
    expect(article.bodyHtml).toBeNull();
    expect(article.source).toBeNull();
    expect(article.sentiment).toBeNull();
    expect(article.categories).toBeNull();
    expect(article.readability).toBeNull();
    expect(article.keywords).toBeNull();
    expect(article.isDuplicate).toBeNull();
    expect(article.readTime).toBeNull();
  });

  test('empty', () => {
    const article = Article.fromArray({});
    expect(article.id).toBeNull();
    expect(article.title).toBeNull();
    expect(article.source).toBeNull();
  });
});
