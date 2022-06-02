import { Component } from '@angular/core';
import { CalculationType } from 'src/app/shared/models/calculation-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  CalculationType: typeof CalculationType = CalculationType;
  calculationType = CalculationType.ThreeDToDots;

  setCalculationType(type: CalculationType) {
    this.calculationType = type;
  }
}
