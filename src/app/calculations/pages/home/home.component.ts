import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CalculationType } from 'src/app/shared/models/calculation/calculation-type.enum';
import { RequestLoadingService } from 'src/app/shared/services/loading/request-loading.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  CalculationType: typeof CalculationType = CalculationType;
  calculationType = CalculationType.TertiaryToDBN;
  loading = false;
  isTestLayout = false; //informs if different settings are to be toggled

  constructor(
    private readonly loadingService: RequestLoadingService,
    private readonly titleService: Title,
    private readonly route: ActivatedRoute,
  ) {
    this.titleService.setTitle('Home | RNApdbee');
    this.loadingService.loading$.subscribe(data => {
      this.loading = data;
    });
  
  
    // Access route data
    this.route.data.subscribe(data => {
      this.isTestLayout = !!data['isTestLayout'];
    });
  }

  setCalculationType(type: CalculationType): void {
    if (!this.loading) {
      this.calculationType = type;
    }
  }
}
