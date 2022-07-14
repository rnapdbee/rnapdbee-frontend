import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ANALYSIS_TOOL, MODEL_SELECTION, NON_CANONICAL_HANDLING, STRUCTURAL_ELEMENTS_HANDLING, VISUALISATION_TOOL } from 'src/app/shared/constants/param-options.const';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';

@Component({
  selector: 'app-tertiary-to-dbn-input-form',
  templateUrl: './tertiary-to-dbn-input-form.component.html',
  styleUrls: ['./tertiary-to-dbn-input-form.component.scss']
})
export class TertiaryToDBNInputFormComponent {
  
  constructor(private readonly fb: FormBuilder) {}

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

  isValid() {
    if(this.uploadMethod && this.uploadMethod.valid) {
      return true;
    }
    return false;
  }

  onUploadMethodChange(event: UploadMethod) {
    this.uploadMethod = event;
  }
  
  onSubmit() {
    // TODO: submit form to service
    console.log(this.paramsForm.value);
    console.log(this.uploadMethod);
  }
}
