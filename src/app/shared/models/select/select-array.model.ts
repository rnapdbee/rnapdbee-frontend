/* eslint-disable import/no-cycle */
import { SelectSubObject } from './select-fields.model';
import { Selectable } from './selectable.model';

// eslint-disable-next-line no-use-before-define
export abstract class SelectArray<S extends SelectSubObject> implements Selectable {
  fields: S[];

  constructor(fields: S[]) {
    this.fields = fields;
  }

  set(value: boolean): void {
    this.fields.forEach((selectable: S) => {
      selectable.set(value);
    });
  }

  getValue(): object {
    return this.fields.map((elem: SelectSubObject) => elem.getValue());
  }

  getSelectedCount(): number {
    return this.fields
      .map(item => item.getSelectedCount())
      .reduce((previous: number, next: number) => previous + next);
  }

  isSelectedOrUnactive(): boolean {
    return this.fields
      .map(item => item.isSelectedOrUnactive())
      .reduce((previous: boolean, current: boolean) => previous && current, true);
  }

  isAnythingSelected(): boolean {
    return this.fields
      .map(item => item.isAnythingSelected())
      .reduce((previous: boolean, current: boolean) => previous || current, false);
  }
}
