import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenCloseAnimation } from 'src/app/shared/animations/open-close';
import { CalculationPageComponent } from 'src/app/shared/components/calculation-page/calculation-page.component';
import { TertiaryOutput } from 'src/app/shared/models/output/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/params/tertiary-to-dbn-params.model';
import { TertiaryToDbnService } from 'src/app/shared/services/calculation/tertiary-to-dbn.service';
import { ErrorService } from 'src/app/shared/services/error/error.service';

@Component({
  selector: 'app-tertiary-page',
  templateUrl: './tertiary-page.component.html',
  styleUrls: ['./tertiary-page.component.scss'],
  animations: [OpenCloseAnimation],
})
export class TertiaryPageComponent extends CalculationPageComponent<TertiaryToDbnParams, TertiaryOutput> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    route: ActivatedRoute,
    calculationService: TertiaryToDbnService,
    errorService: ErrorService,
  ) {
    super(route, calculationService, errorService);
  }
}
