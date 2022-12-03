import { Component } from '@angular/core';
import { CalculationType } from 'src/app/shared/models/calculation/calculation-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  CalculationType: typeof CalculationType = CalculationType;
  calculationType = CalculationType.TertiaryToDBN;

  setCalculationType(type: CalculationType): void {
    this.calculationType = type;
  }
}
