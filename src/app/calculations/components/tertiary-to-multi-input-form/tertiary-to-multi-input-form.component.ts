import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MODEL_SELECTION, VISUALISATION_TOOL } from 'src/app/shared/constants/param-options.const';
import { TertiaryToMultiParams } from 'src/app/shared/models/tertiary-to-multi-params.model';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';
import { CalculationService } from 'src/app/shared/services/calculation/calculation.service';

@Component({
  selector: 'app-tertiary-to-multi-input-form',
  templateUrl: './tertiary-to-multi-input-form.component.html',
  styleUrls: ['./tertiary-to-multi-input-form.component.scss'],
})
export class TertiaryToMultiInputFormComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly calculationService: CalculationService,
  ) { }

  MODEL_SELECTION = MODEL_SELECTION;
  VISUALISATION_TOOL = VISUALISATION_TOOL;

  uploadMethod: UploadMethod | undefined;

  paramsForm = this.fb.group({
    modelSelection: [MODEL_SELECTION[0].key],
    includeNonCanonical: [false],
    removeIsolated: [false],
    visualizationTool: [VISUALISATION_TOOL[0].key],
  });

  isValid(): boolean {
    return !!(this.uploadMethod && this.uploadMethod.valid);
  }

  onUploadMethodChange(event: UploadMethod) {
    this.uploadMethod = event;
  }

  onSubmit(): void {
    if (!this.uploadMethod) {
      throw new Error('Upload method could not be defined.');
    }
    if (this.uploadMethod.valid) {
      this.calculationService.calculateTertiaryToMulti(this.paramsForm.value as TertiaryToMultiParams, this.uploadMethod);
    }
  }
}
