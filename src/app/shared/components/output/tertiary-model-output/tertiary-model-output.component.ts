import { Component, Input } from '@angular/core';
import { TertiaryModelFlags } from 'src/app/shared/models/flags/tertiary-flags.model';
import { TertiaryModel } from 'src/app/shared/models/output/tertiary-output.model';
import { ControlValueComponent, ControlValueProvider } from '../../control-value/control-value.component';

@Component({
  selector: 'app-tertiary-model-output[output]',
  templateUrl: './tertiary-model-output.component.html',
  styleUrls: ['./tertiary-model-output.component.scss'],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(TertiaryModelOutputComponent)],
})
export class TertiaryModelOutputComponent extends ControlValueComponent<TertiaryModelFlags> {
  @Input() output: TertiaryModel | undefined;

  constructor() {
    super(new TertiaryModelFlags());
  }
}
