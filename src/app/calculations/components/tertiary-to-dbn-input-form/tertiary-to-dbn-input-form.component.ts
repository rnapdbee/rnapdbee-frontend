import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputFormComponent } from 'src/app/shared/components/input-form/input-form.component';
import { TertiaryOutput } from 'src/app/shared/models/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/tertiary-to-dbn-params.model';
import { TertiaryToDbnService } from 'src/app/shared/services/calculation/tertiary-to-dbn.service';
import { SnackBarService } from 'src/app/shared/services/notifications/snack-bar.service';

@Component({
  selector: 'app-tertiary-to-dbn-input-form',
  templateUrl: './tertiary-to-dbn-input-form.component.html',
  styleUrls: ['./tertiary-to-dbn-input-form.component.scss'],
})
export class TertiaryToDBNInputFormComponent extends InputFormComponent<TertiaryToDbnParams, TertiaryOutput> {
  constructor(
    router: Router,
    snackBar: SnackBarService,
    calculationService: TertiaryToDbnService,
  ) {
    super(router, snackBar, calculationService, 'results/3d');
  }
}
