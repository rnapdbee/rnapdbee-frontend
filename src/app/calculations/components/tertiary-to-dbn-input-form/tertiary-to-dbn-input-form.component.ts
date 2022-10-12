import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ANALYSIS_TOOL,
  MODEL_SELECTION,
  NON_CANONICAL_HANDLING,
  STRUCTURAL_ELEMENTS_HANDLING,
  VISUALISATION_TOOL,
} from 'src/app/shared/constants/param-options.const';
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
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly tertiaryToDbnService: TertiaryToDbnService,
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
      // TODO: add loading on the button
      this.tertiaryToDbnService.calculate(this.paramsForm.value as TertiaryToDbnParams, this.uploadMethod).subscribe({
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
