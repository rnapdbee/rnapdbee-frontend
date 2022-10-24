import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class CheckboxComponent {
  @Input() label = '';
  @Input() showControls = false;
  @Input() expanded = false;
  @Input() indentation = true;

  val: boolean | undefined = undefined;

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }

  onChange(_: boolean): void {
    // do nothing.
  }

  onTouch(_: boolean): void {
    // do nothing.
  }

  set value(val: boolean) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }
  get value() { return !!this.val; }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: never): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouch = fn;
  }
}
