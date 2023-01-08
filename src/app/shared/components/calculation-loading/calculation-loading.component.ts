import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculation-loading',
  templateUrl: './calculation-loading.component.html',
  styleUrls: ['./calculation-loading.component.scss'],
})
export class CalculationLoadingComponent {
  @Input() calculationId: string | undefined = '';
  @Input() scenario = '';
  @Input() scenarioInfo = '';
}
