import { Component, Input } from '@angular/core';
import { SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { SecondarySelect } from 'src/app/shared/models/select/secondary-select.model';
import { ControlValueComponent, ControlValueProvider } from '../../control-value/control-value.component';


@Component({
  selector: 'app-secondary-output[output]',
  templateUrl: './secondary-output.component.html',
  styleUrls: ['./secondary-output.component.scss'],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(SecondaryOutputComponent)],
})
export class SecondaryOutputComponent extends ControlValueComponent<SecondarySelect> {
  @Input() output: SecondaryOutput | undefined;

  constructor() { super(new SecondarySelect()); }
}
