import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MODEL_SELECTION, VISUALISATION_TOOL } from 'src/app/shared/constants/param-options.const';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';

@Component({
  selector: 'app-tertiary-to-multi-input-form',
  templateUrl: './tertiary-to-multi-input-form.component.html',
  styleUrls: ['./tertiary-to-multi-input-form.component.scss']
})
export class TertiaryToMultiInputFormComponent {

  constructor(private readonly fb: FormBuilder) {}

  MODEL_SELECTION = MODEL_SELECTION;
  VISUALISATION_TOOL = VISUALISATION_TOOL;

  uploadMethod: UploadMethod | undefined;

  paramsForm = this.fb.group({
    modelSelection: [MODEL_SELECTION[0].key],
    includeNonCanonical: [false],
    removeIsolated: [false],
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
