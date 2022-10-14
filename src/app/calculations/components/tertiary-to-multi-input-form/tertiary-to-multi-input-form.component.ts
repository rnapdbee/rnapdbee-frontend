import { Component } from '@angular/core';
import { TertiaryToMultiParams } from 'src/app/shared/models/tertiary-to-multi-params.model';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';
import { TertiaryToMultiService } from 'src/app/shared/services/calculation/tertiary-to-multi.service';

@Component({
  selector: 'app-tertiary-to-multi-input-form',
  templateUrl: './tertiary-to-multi-input-form.component.html',
  styleUrls: ['./tertiary-to-multi-input-form.component.scss'],
})
export class TertiaryToMultiInputFormComponent {
  constructor(
    private readonly tertiaryToMultiService: TertiaryToMultiService,
  ) { }

  uploadMethod: UploadMethod | undefined;
  params: TertiaryToMultiParams | undefined;


  isValid(): boolean {
    return !!(this.uploadMethod && this.uploadMethod.valid);
  }

  onParamsChange(event: TertiaryToMultiParams) {
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
      this.tertiaryToMultiService.calculate(this.params, this.uploadMethod);
    }
  }
}
