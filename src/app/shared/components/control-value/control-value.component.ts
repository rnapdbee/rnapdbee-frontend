import { forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export function ControlValueProvider(componentClass: unknown) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => componentClass),
    multi: true,
  };
}

export abstract class ControlValueComponent<F> implements ControlValueAccessor {
  private _value: F;
  get value(): F { return this._value; }
  set value(value: F) {
    if (value !== null && this._value !== value) {
      this._value = value;
      this.onChange(value);
    }
  }

  constructor(private readonly initialValue: F) {
    this._value = this.initialValue;
  }

  writeValue(value: F): void {
    this.value = value;
  }

  registerOnChange(fn: never): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouch = fn;
  }

  private onChange: (_: F) => void = () => { /* do nothing. */ };
  private onTouch: (_: F) => void = () => { /* do nothing. */ };
}
