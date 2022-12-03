import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TertiaryModelFlags } from 'src/app/shared/models/flags/tertiary-flags.model';
import { TertiaryOutput } from 'src/app/shared/models/output/tertiary-output.model';
import { ControlValueComponent } from '../control-value.component';

@Component({
  selector: 'app-tertiary-output',
  templateUrl: './tertiary-output.component.html',
  styleUrls: ['./tertiary-output.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => TertiaryOutputComponent),
      multi: true,
    },
  ],
})
export class TertiaryOutputComponent extends ControlValueComponent<TertiaryModelFlags> {
  @Input() output: TertiaryOutput | undefined;

  constructor() {
    super(TertiaryModelFlags);
  }
}
