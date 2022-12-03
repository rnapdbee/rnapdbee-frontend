import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SecondaryFlags } from 'src/app/shared/models/flags/secondary-flags.model';
import { SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';


@Component({
  selector: 'app-secondary-output[output]',
  templateUrl: './secondary-output.component.html',
  styleUrls: ['./secondary-output.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => SecondaryOutputComponent),
      multi: true,
    },
  ],
})
export class SecondaryOutputComponent implements ControlValueAccessor {
  @Input() output: SecondaryOutput | undefined;

  private _value: SecondaryFlags = new SecondaryFlags();
  get value() { return this._value; }

  set value(value: SecondaryFlags) {
    if (value && this._value !== value) {
      this._value = value;
      this.onChange(value);
      this.onTouch(value);
    }
  }

  writeValue(value: SecondaryFlags): void {
    this.value = value;
  }

  registerOnChange(_: never): void {
    // do nothing.
  }

  registerOnTouched(_: never): void {
    // do nothing.
  }

  onChange(_: SecondaryFlags): void {
    // do nothing.
  }

  onTouch(_: SecondaryFlags): void {
    // do nothing.
  }
}
