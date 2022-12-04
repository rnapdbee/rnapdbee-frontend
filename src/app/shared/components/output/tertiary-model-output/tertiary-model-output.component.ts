import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TertiaryModelFlags } from 'src/app/shared/models/flags/tertiary-flags.model';
import { TertiaryModel } from 'src/app/shared/models/output/tertiary-output.model';
import { ControlValueComponent } from '../control-value.component';

@Component({
  selector: 'app-tertiary-model-output[output]',
  templateUrl: './tertiary-model-output.component.html',
  styleUrls: ['./tertiary-model-output.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => TertiaryModelOutputComponent),
      multi: true,
    },
  ],
})
export class TertiaryModelOutputComponent extends ControlValueComponent<TertiaryModelFlags> {
  @Input() output: TertiaryModel | undefined;

  constructor() {
    super(TertiaryModelFlags);
  }
}
