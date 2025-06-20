import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CalculationPageComponent } from 'src/app/shared/components/calculation-page/calculation-page.component';
import { MultiOutput } from 'src/app/shared/models/output/multi-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/params/tertiary-to-multi-params.model';
import { TertiaryToMultiService } from 'src/app/shared/services/calculation/tertiary-to-multi.service';
import { ErrorService } from 'src/app/shared/services/error/error.service';

@Component({
  selector: 'app-multi-page',
  templateUrl: './multi-page.component.html',
  styleUrls: ['./multi-page.component.scss'],
})
export class MultiPageComponent extends CalculationPageComponent<TertiaryToMultiParams, MultiOutput> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    route: ActivatedRoute,
    calculationService: TertiaryToMultiService,
    errorService: ErrorService,
    titleService: Title,
  ) {
    super(route, calculationService, errorService, titleService);
  }
}
