import { Component } from '@angular/core';
import { CalculationType } from 'src/app/shared/models/calculation/calculation-type.enum';
import { RequestLoadingService } from 'src/app/shared/services/loading/request-loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  CalculationType: typeof CalculationType = CalculationType;
  calculationType = CalculationType.TertiaryToDBN;
  loading = false;

  constructor(private readonly loadingService: RequestLoadingService) {
    this.loadingService.loading$.subscribe(data => {
      this.loading = data;
    });
  }

  setCalculationType(type: CalculationType): void {
    if (!this.loading) {
      this.calculationType = type;
    }
  }
}
