export class BaseUri {
  public readonly value: string;

  constructor(value: string) {
    this.value = value.replace(/\/+$/, '');
  }

  toString(): string {
    return this.value;
  }
}
