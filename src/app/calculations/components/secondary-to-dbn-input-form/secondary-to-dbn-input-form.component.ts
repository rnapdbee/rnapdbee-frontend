import { Component } from '@angular/core';
import { SecondaryToDbnParams } from 'src/app/shared/models/secondary-to-dbn-params.module';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';
import { SecondaryToDbnService } from 'src/app/shared/services/calculation/secondary-to-dbn.service';

@Component({
  selector: 'app-secondary-to-dbn-input-form',
  templateUrl: './secondary-to-dbn-input-form.component.html',
  styleUrls: ['./secondary-to-dbn-input-form.component.scss'],
})
export class SecondaryToDbnInputFormComponent {
  constructor(
    private readonly secondaryToDbnService: SecondaryToDbnService,
  ) { }

  uploadMethod: UploadMethod | undefined;
  params: SecondaryToDbnParams | undefined;

  isValid(): boolean {
    return !!(this.uploadMethod && this.uploadMethod.valid);
  }

  onParamsChange(event: SecondaryToDbnParams) {
    this.params = event;
  }

  onUploadMethodChange(event: UploadMethod): void {
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
      this.secondaryToDbnService.calculate(this.params, this.uploadMethod);
    }
  }
}
