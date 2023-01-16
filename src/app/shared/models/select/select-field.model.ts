import { Selectable } from './selectable.model';

export class SelectField implements Selectable {
  private active = false;
  value: boolean;

  constructor(initialValue: boolean) {
    this.value = initialValue;
  }

  set(value: boolean): void {
    if (this.active) {
      this.value = value;
    }
  }

  getValue(): boolean {
    return this.value;
  }

  isSelectedOrUnactive(): boolean {
    if (this.active) {
      return this.value;
    }
    return true;
  }

  isAnythingSelected(): boolean {
    return this.value;
  }

  activateField() {
    this.active = true;
  }
}
