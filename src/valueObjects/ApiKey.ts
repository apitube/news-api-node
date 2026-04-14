export class ApiKey {
  public readonly value: string;

  constructor(value: string) {
    if (value.trim() === '') {
      throw new Error('API key cannot be empty.');
    }
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}
