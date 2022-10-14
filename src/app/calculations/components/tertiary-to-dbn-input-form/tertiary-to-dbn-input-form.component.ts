import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TertiaryToDbnParams } from 'src/app/shared/models/tertiary-to-dbn-params.model';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';
import { TertiaryToDbnService } from 'src/app/shared/services/calculation/tertiary-to-dbn.service';

@Component({
  selector: 'app-tertiary-to-dbn-input-form',
  templateUrl: './tertiary-to-dbn-input-form.component.html',
  styleUrls: ['./tertiary-to-dbn-input-form.component.scss'],
})
export class TertiaryToDBNInputFormComponent {
  constructor(
    private readonly router: Router,
    private readonly tertiaryToDbnService: TertiaryToDbnService,
  ) { }

  uploadMethod: UploadMethod | undefined;
  params: TertiaryToDbnParams | undefined;


  isValid(): boolean {
    return !!(this.uploadMethod && this.uploadMethod.valid);
  }

  onParamsChange(event: TertiaryToDbnParams) {
    this.params = event;
  }

  onUploadMethodChange(event: UploadMethod) {
    this.uploadMethod = event;
  }

  onSubmit(): void {
    if (!this.uploadMethod) {
      throw new Error('Upload method could not be defined.');
    }
    if (!this.params) {
      throw new Error('Parameters could not be defined.');
    }
    if (this.uploadMethod.valid) {
      // TODO: add loading on the button
      this.tertiaryToDbnService.calculate(this.params, this.uploadMethod).subscribe({
        next: data => {
          // eslint-disable-next-line no-void
          void this.router.navigate(['results/3d', data.id]);
        },
        error: (error: Error) => {
          this.handleError(error);
        },
      });
    }
  }

  private handleError(_: Error) {
    // TODO: handle errors and show it to user
  }
}
