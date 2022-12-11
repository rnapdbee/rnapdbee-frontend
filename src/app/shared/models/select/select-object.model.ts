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
