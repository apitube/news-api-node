import { Translation } from './Translation.js';

export class Translations {
  constructor(public readonly en: Translation | null) {}

  static fromArray(data: Record<string, any>): Translations {
    return new Translations(data.en != null ? Translation.fromArray(data.en) : null);
  }
}
