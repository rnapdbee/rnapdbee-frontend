import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-calculation-loading',
  templateUrl: './calculation-loading.component.html',
  styleUrls: ['./calculation-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class CalculationLoadingComponent {
  @Input() calculationId: string | undefined = '';
  @Input() scenario = '';
  @Input() scenarioInfo = '';
}
