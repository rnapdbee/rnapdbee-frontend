import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SecondaryFlags } from 'src/app/shared/models/flags/secondary-flags.model';
import { DrawingResult, ImageInformation } from 'src/app/shared/models/output/secondary-output.model';


@Component({
  selector: 'app-secondary-image',
  templateUrl: './secondary-image.component.html',
  styleUrls: ['./secondary-image.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => SecondaryImageComponent),
      multi: true,
    },
  ],
})
export class SecondaryImageComponent implements ControlValueAccessor {
  @Input() imageInformation: ImageInformation | undefined;
  DrawingResult: typeof DrawingResult = DrawingResult;

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

  registerOnChange(fn: never): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouch = fn;
  }

  onChange(_: SecondaryFlags): void {
    // do nothing.
  }

  onTouch(_: SecondaryFlags): void {
    // do nothing.
  }
}
