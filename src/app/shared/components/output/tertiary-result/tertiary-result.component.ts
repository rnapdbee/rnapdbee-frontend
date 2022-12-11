import { Component, Input } from '@angular/core';
import { Result } from 'src/app/shared/models/calculation/calculation.model';
import { TertiaryOutput } from 'src/app/shared/models/output/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/params/tertiary-to-dbn-params.model';
import { TertiaryResultSelect } from 'src/app/shared/models/select/tertiary-result-select.model';
import { DescriptionService } from 'src/app/shared/services/result/description.service';
import { ControlValueComponent, ControlValueProvider } from '../../control-value/control-value.component';

@Component({
  selector: 'app-tertiary-result',
  templateUrl: './tertiary-result.component.html',
  styleUrls: ['./tertiary-result.component.scss'],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(TertiaryResultComponent)],
})
export class TertiaryResultComponent extends ControlValueComponent<TertiaryResultSelect> {
  private _result: Result<TertiaryToDbnParams, TertiaryOutput> | undefined;
  @Input() set result(value: Result<TertiaryToDbnParams, TertiaryOutput> | undefined) {
    if (value) {
      this.value = new TertiaryResultSelect(value.output.models.length);
    }
    this._result = value;
  }
  get result() { return this._result; }

  constructor(private readonly descriptionService: DescriptionService) {
    super(new TertiaryResultSelect(0));
  }

  select(): void {
    this.value.set(!this.value.isSelectedOrUnactive());
  }

  isSelected(): boolean {
    return this.value.isSelectedOrUnactive();
  }

  getDescription(params: TertiaryToDbnParams): string {
    return this.descriptionService.generateTertiaryDescription(params);
  }
}
