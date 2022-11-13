import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputFormComponent } from 'src/app/shared/components/input-form/input-form.component';
import { MultiOutput } from 'src/app/shared/models/multi-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/tertiary-to-multi-params.model';
import { TertiaryToMultiService } from 'src/app/shared/services/calculation/tertiary-to-multi.service';
import { SnackBarService } from 'src/app/shared/services/notifications/snack-bar.service';

@Component({
  selector: 'app-tertiary-to-multi-input-form',
  templateUrl: './tertiary-to-multi-input-form.component.html',
  styleUrls: ['./tertiary-to-multi-input-form.component.scss'],
})
export class TertiaryToMultiInputFormComponent extends InputFormComponent<TertiaryToMultiParams, MultiOutput> {
  constructor(
    router: Router,
    snackBar: SnackBarService,
    calculationService: TertiaryToMultiService,
  ) {
    super(router, snackBar, calculationService, 'results/multi');
  }
}
