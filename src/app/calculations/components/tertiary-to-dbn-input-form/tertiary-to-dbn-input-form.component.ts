import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  ANALYSIS_TOOL,
  MODEL_SELECTION,
  NON_CANONICAL_HANDLING,
  STRUCTURAL_ELEMENTS_HANDLING,
  VISUALISATION_TOOL,
} from 'src/app/shared/constants/param-options.const';
import { TertiaryToDbnParams } from 'src/app/shared/models/tertiary-to-dbn-params.model';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';
import { CalculationService } from 'src/app/shared/services/calculation/calculation.service';

@Component({
  selector: 'app-tertiary-to-dbn-input-form',
  templateUrl: './tertiary-to-dbn-input-form.component.html',
  styleUrls: ['./tertiary-to-dbn-input-form.component.scss'],
})
export class TertiaryToDBNInputFormComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly calculationService: CalculationService,
  ) { }

  MODEL_SELECTION = MODEL_SELECTION;
  ANALYSIS_TOOL = ANALYSIS_TOOL;
  NON_CANONICAL_HANDLING = NON_CANONICAL_HANDLING;
  STRUCTURAL_ELEMENTS_HANDLING = STRUCTURAL_ELEMENTS_HANDLING;
  VISUALISATION_TOOL = VISUALISATION_TOOL;

  uploadMethod: UploadMethod | undefined;

  paramsForm = this.fb.group({
    modelSelection: [MODEL_SELECTION[0].key],
    analysisTool: [ANALYSIS_TOOL[0].key],
    nonCanonicalHandling: [NON_CANONICAL_HANDLING[0].key],
    removeIsolated: [false],
    structuralElementsHandling: [STRUCTURAL_ELEMENTS_HANDLING[0].key],
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
      this.calculationService.calculateTertiaryToDbn(this.paramsForm.value as TertiaryToDbnParams, this.uploadMethod);
    }
  }
}
