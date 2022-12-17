import { Component, Input } from '@angular/core';
import { Result } from 'src/app/shared/models/calculation/calculation.model';
import { SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/params/secondary-to-dbn-params.model';
import { SecondaryResultSelect } from 'src/app/shared/models/select/secondary-result-select.model';
import { DescriptionService } from 'src/app/shared/services/result/description.service';
import { ControlValueComponent, ControlValueProvider } from '../../control-value/control-value.component';

@Component({
  selector: 'app-secondary-result',
  templateUrl: './secondary-result.component.html',
  styleUrls: ['./secondary-result.component.scss'],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(SecondaryResultComponent)],
})
export class SecondaryResultComponent extends ControlValueComponent<SecondaryResultSelect> {
  @Input() result: Result<SecondaryToDbnParams, SecondaryOutput> | undefined;

  constructor(private readonly descriptionService: DescriptionService) {
    super(new SecondaryResultSelect());
  }

  select(): void {
    this.value.set(!this.value.isSelectedOrUnactive());
  }

  isSelected(): boolean {
    return this.value.isSelectedOrUnactive();
  }

  getDescription(params: SecondaryToDbnParams): string {
    return this.descriptionService.generateSecondaryDescription(params);
  }
}
