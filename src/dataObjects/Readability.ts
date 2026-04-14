export class Readability {
  constructor(
    public readonly fleschKincaidGrade: number | null,
    public readonly fleschReadingEase: number | null,
    public readonly automatedReadabilityIndex: number | null,
    public readonly difficultyLevel: string | null,
    public readonly targetAudience: string | null,
    public readonly readingAge: number | null,
    public readonly avgWordsPerSentence: number | null,
    public readonly avgSyllablesPerWord: number | null,
  ) {}

  static fromArray(data: Record<string, any>): Readability {
    return new Readability(
      data.flesch_kincaid_grade != null ? Number(data.flesch_kincaid_grade) : null,
      data.flesch_reading_ease != null ? Number(data.flesch_reading_ease) : null,
      data.automated_readability_index != null ? Number(data.automated_readability_index) : null,
      data.difficulty_level ?? null,
      data.target_audience ?? null,
      data.reading_age != null ? Number(data.reading_age) : null,
      data.avg_words_per_sentence != null ? Number(data.avg_words_per_sentence) : null,
      data.avg_syllables_per_word != null ? Number(data.avg_syllables_per_word) : null,
    );
  }
}
