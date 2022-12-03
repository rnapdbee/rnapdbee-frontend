import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SecondaryFlags } from 'src/app/shared/models/flags/secondary-flags.model';
import { SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { ControlValueComponent } from '../control-value.component';


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
export class SecondaryOutputComponent extends ControlValueComponent<SecondaryFlags> {
  @Input() output: SecondaryOutput | undefined;

  constructor() {
    super(SecondaryFlags);
  }
}
