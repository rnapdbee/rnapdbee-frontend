import { ControlValueAccessor } from '@angular/forms';

export abstract class ControlValueComponent<F> implements ControlValueAccessor {
  private _value: F;
  get value() { return this._value; }

  set value(value: F) {
    if (value && this._value !== value) {
      this._value = value;
      this.onChange(value);
      this.onTouch(value);
    }
  }

  constructor(private readonly FlagObject: new () => F) {
    this._value = new this.FlagObject();
  }

  writeValue(value: F): void {
    this.value = value;
  }

  registerOnChange(_: never): void {
    // do nothing.
  }

  registerOnTouched(_: never): void {
    // do nothing.
  }

  onChange(_: F): void {
    // do nothing.
  }

  onTouch(_: F): void {
    // do nothing.
  }
}
