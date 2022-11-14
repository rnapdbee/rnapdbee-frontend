import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalculationPageComponent } from 'src/app/shared/components/calculation-page/calculation-page.component';
import { SecondaryOutput } from 'src/app/shared/models/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/secondary-to-dbn-params.module';
import { SecondaryToDbnService } from 'src/app/shared/services/calculation/secondary-to-dbn.service';

@Component({
  selector: 'app-secondary-page',
  templateUrl: './secondary-page.component.html',
  styleUrls: ['./secondary-page.component.scss'],
})
export class SecondaryPageComponent extends CalculationPageComponent<SecondaryToDbnParams, SecondaryOutput> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    route: ActivatedRoute,
    calculationService: SecondaryToDbnService,
  ) {
    super(route, calculationService);
  }
}
