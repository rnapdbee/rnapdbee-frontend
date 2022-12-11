import { Selectable } from './selectable.model';

export class SelectField implements Selectable {
  private active = false;
  value: boolean;

  constructor(initialValue: boolean) {
    this.value = initialValue;
  }

  set(value: boolean): void {
    this.value = value;
  }

  isSelectedOrUnactive(): boolean {
    if (this.active) {
      return this.value;
    }
    return true;
  }

  activateField() {
    this.active = true;
  }
}
