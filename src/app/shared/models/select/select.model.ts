export interface SelectFields {
  // eslint-disable-next-line no-use-before-define
  [Property: string]: boolean | Select<SelectFields>;
}

export abstract class Select<F extends SelectFields> {
  fields: F;

  constructor(fields: F) {
    this.fields = fields;
  }

  isSelected(): boolean {
    return Object.keys(this.fields)
      .map(item => this.getValue(this.fields[item]))
      .reduce((previous: boolean, current: boolean) => previous && current, true);
  }

  set(value: boolean): void {
    Object.entries(this.fields).forEach(([key, val]) => {
      if (this.isObject(val)) {
        (this.fields[key] as Select<SelectFields>).set(value);
      } else {
        (this.fields[key as keyof F] as boolean) = value;
      }
    });
  }

  private isObject(field: boolean | Select<SelectFields>): boolean {
    return field instanceof Select;
  }

  private getValue(field: boolean | Select<SelectFields>): boolean {
    if (this.isObject(field)) { return (field as Select<SelectFields>).isSelected(); }
    return (field as boolean);
  }
}
