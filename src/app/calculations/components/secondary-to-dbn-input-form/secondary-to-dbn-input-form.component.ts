import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputFormComponent } from 'src/app/shared/components/input-form/input-form.component';
import { SecondaryOutput } from 'src/app/shared/models/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/secondary-to-dbn-params.module';
import { SecondaryToDbnService } from 'src/app/shared/services/calculation/secondary-to-dbn.service';
import { SnackBarService } from 'src/app/shared/services/notifications/snack-bar.service';

@Component({
  selector: 'app-secondary-to-dbn-input-form',
  templateUrl: './secondary-to-dbn-input-form.component.html',
  styleUrls: ['./secondary-to-dbn-input-form.component.scss'],
})
export class SecondaryToDbnInputFormComponent extends InputFormComponent<SecondaryToDbnParams, SecondaryOutput> {
  constructor(
    router: Router,
    snackBar: SnackBarService,
    calculationService: SecondaryToDbnService,
  ) {
    super(router, snackBar, calculationService, 'results/2d');
  }
}
