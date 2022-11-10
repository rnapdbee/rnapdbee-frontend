import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OpenCloseAnimation } from '../../animations/open-close';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  animations: [OpenCloseAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() showControls = false;
  @Input() expanded = false;
  @Input() indentation = true;
  @Input() textView = false;

  private _value = false;
  get value() { return this._value; }

  set value(val: boolean) {
    if (val !== undefined && this._value !== val) {
      this._value = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: never): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouch = fn;
  }

  onChange(_: boolean): void {
    // do nothing.
  }

  onTouch(_: boolean): void {
    // do nothing.
  }
}
