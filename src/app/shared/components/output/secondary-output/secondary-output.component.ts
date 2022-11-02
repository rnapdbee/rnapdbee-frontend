import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SecondaryFlags } from 'src/app/shared/models/secondary-flags.model';
import { SecondaryOutput } from 'src/app/shared/models/secondary-output.model';


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
export class SecondaryOutputComponent {
  @Input() output: SecondaryOutput | undefined;
  @Input() _selected: SecondaryFlags = new SecondaryFlags();

  get selected() {
    return this._selected;
  }

  set selected(value: SecondaryFlags) {
    if (value && this._selected !== value) {
      this._selected = value;
    }
  }

  writeValue(value: SecondaryFlags): void {
    this.selected = value;
  }

  registerOnChange(_: never): void {
    // do nothing.
  }

  registerOnTouched(_: never): void {
    // do nothing.
  }
}
