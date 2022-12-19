import { Component, Input } from '@angular/core';
import { Result } from 'src/app/shared/models/calculation/calculation.model';
import { MultiOutput } from 'src/app/shared/models/output/multi-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/params/tertiary-to-multi-params.model';
import { MultiResultSelect } from 'src/app/shared/models/select/multi-result-select.model';
import { DescriptionService } from 'src/app/shared/services/result/description.service';
import { ControlValueComponent, ControlValueProvider } from '../../control-value/control-value.component';

@Component({
  selector: 'app-multi-result',
  templateUrl: './multi-result.component.html',
  styleUrls: ['./multi-result.component.scss'],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(MultiResultComponent)],
})
export class MultiResultComponent extends ControlValueComponent<MultiResultSelect> {
  private _result: Result<TertiaryToMultiParams, MultiOutput> | undefined;
  @Input() set result(value: Result<TertiaryToMultiParams, MultiOutput> | undefined) {
    if (value) {
      this.value = new MultiResultSelect(value.output.entries.length);
    }
    this._result = value;
  }
  get result() { return this._result; }

  constructor(private readonly descriptionService: DescriptionService) {
    super(new MultiResultSelect(0));
  }

  select(): void {
    this.value.set(!this.value.isSelectedOrUnactive());
  }

  isSelected(): boolean {
    return this.value.isSelectedOrUnactive();
  }

  getDescription(params: TertiaryToMultiParams): string {
    return this.descriptionService.generateMultiDescription(params);
  }
}
