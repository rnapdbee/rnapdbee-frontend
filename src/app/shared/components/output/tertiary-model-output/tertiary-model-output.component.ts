import { Component, Input } from '@angular/core';
import { TertiaryModel } from 'src/app/shared/models/output/tertiary-output.model';
import { TertiaryModelSelect } from 'src/app/shared/models/select/tertiary-select.model';
import { ControlValueComponent } from '../../control-value/control-value.component';

@Component({
  selector: 'app-tertiary-model-output[model]',
  templateUrl: './tertiary-model-output.component.html',
  styleUrls: ['./tertiary-model-output.component.scss'],
})
export class TertiaryModelOutputComponent extends ControlValueComponent<TertiaryModelSelect> {
  @Input() model: TertiaryModel | undefined;
  constructor() { super(new TertiaryModelSelect()); }
}
