import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AnalysisTool, ModelSelection, NonCanonicalHandling, StructuralElementsHandling, VisualizationTool } from 'src/app/shared/constants/param-options.const';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';

@Component({
  selector: 'app-tertiary-to-dbn-input-form',
  templateUrl: './tertiary-to-dbn-input-form.component.html',
  styleUrls: ['./tertiary-to-dbn-input-form.component.scss']
})
export class TertiaryToDBNInputFormComponent {
  
  constructor(private readonly fb: FormBuilder) {}

  ModelSelection = ModelSelection;
  AnalysisTool = AnalysisTool;
  NonCanonicalHandling = NonCanonicalHandling;
  StructuralElementsHandling = StructuralElementsHandling;
  VisualizationTool = VisualizationTool;

  uploadMethod: UploadMethod | undefined;

  paramsForm = this.fb.group({
    modelSelection: [ModelSelection[0].key],
    analysisTool: [AnalysisTool[0].key],
    nonCanonicalHandling: [NonCanonicalHandling[0].key],
    removeIsolated: [true],
    structuralElementsHandling: [StructuralElementsHandling[0].key],
    visualizationTool: [VisualizationTool[0].key],
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
