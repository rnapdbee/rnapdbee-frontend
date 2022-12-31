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
  private _model: TertiaryModel | undefined;
  @Input() set model(value: TertiaryModel | undefined) {
    if (value) {
      this.generateOutputTexts(value);
    }
    this._model = value;
  }
  get model() { return this._model; }
  messagesText = '';

  constructor() { super(new TertiaryModelSelect()); }

  generateOutputTexts(model: TertiaryModel) {
    this.messagesText = model.messages.join('\n');
  }
}
