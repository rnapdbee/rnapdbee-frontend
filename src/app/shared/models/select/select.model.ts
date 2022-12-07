export type SelectFields<T> = {
  [Property in keyof T]: boolean;
}

export abstract class Select<T> {
  fields: SelectFields<T>;

  constructor(flags: SelectFields<T>) {
    this.fields = flags;
  }

  isSelected(): boolean {
    return Object.keys(this.fields)
      .map(item => this.fields[item as keyof T])
      .reduce((previous: boolean, current: boolean) => previous && current, true);
  }

  set(value: boolean): void {
    Object.keys(this.fields).forEach((item: string) => {
      this.fields[item as keyof T] = value;
    });
  }
}
