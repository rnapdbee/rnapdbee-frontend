import { Component, Input } from '@angular/core';
import { TertiaryModel } from 'src/app/shared/models/output/tertiary-output.model';
import { TertiaryModelSelect } from 'src/app/shared/models/select/tertiary-model-select.model';
import { ControlValueComponent, ControlValueProvider } from '../../control-value/control-value.component';

@Component({
  selector: 'app-tertiary-model-output[model]',
  templateUrl: './tertiary-model-output.component.html',
  styleUrls: ['./tertiary-model-output.component.scss'],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(TertiaryModelOutputComponent)],
})
export class TertiaryModelOutputComponent extends ControlValueComponent<TertiaryModelSelect> {
  @Input() model: TertiaryModel | undefined;
  constructor() { super(new TertiaryModelSelect()); }
}
