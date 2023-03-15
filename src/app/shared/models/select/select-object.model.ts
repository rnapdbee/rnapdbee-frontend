// eslint-disable-next-line import/no-cycle
import { SelectFields } from './select-fields.model';
import { Selectable } from './selectable.model';

export abstract class SelectObject<F extends SelectFields> implements Selectable {
  fields: F;

  constructor(fields: F) {
    this.fields = fields;
  }

  set(value: boolean): void {
    Object.keys(this.fields).forEach(item => {
      this.fields[item].set(value);
    });
  }

  getValue(): object {
    const valueObj: {[k: string]: object | boolean} = {};
    Object.keys(this.fields).forEach(item => {
      valueObj[item] = this.fields[item].getValue();
    });
    return valueObj;
  }

  getSelectedCount(): number {
    return Object.keys(this.fields)
      .map(key => this.fields[key].getSelectedCount())
      .reduce((previous: number, next: number) => previous + next);
  }

  isSelectedOrUnactive(): boolean {
    return Object.keys(this.fields)
      .map(item => this.fields[item].isSelectedOrUnactive())
      .reduce((previous: boolean, current: boolean) => previous && current, true);
  }

  isAnythingSelected(): boolean {
    return Object.keys(this.fields)
      .map(item => this.fields[item].isAnythingSelected())
      .reduce((previous: boolean, current: boolean) => previous || current, false);
  }
}
