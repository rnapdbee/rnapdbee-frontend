import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { STRUCTURAL_ELEMENTS_HANDLING, VISUALISATION_TOOL } from 'src/app/shared/constants/param-options.const';
import { UploadMethod } from 'src/app/shared/models/upload-type.model';

@Component({
  selector: 'app-secondary-to-dbn-input-form',
  templateUrl: './secondary-to-dbn-input-form.component.html',
  styleUrls: ['./secondary-to-dbn-input-form.component.scss']
})
export class SecondaryToDbnInputFormComponent {

  constructor(private readonly fb: FormBuilder) { }

  STRUCTURAL_ELEMENTS_HANDLING = STRUCTURAL_ELEMENTS_HANDLING;
  VISUALISATION_TOOL = VISUALISATION_TOOL;

  uploadMethod: UploadMethod | undefined;

  paramsForm = this.fb.group({
    removeIsolated: [false],
    structuralElementsHandling: [STRUCTURAL_ELEMENTS_HANDLING[0].key],
    visualizationTool: [VISUALISATION_TOOL[0].key]
  })

  isValid(): boolean {
    return !!(this.uploadMethod && this.uploadMethod.valid);
  }

  onUploadMethodChange(event: UploadMethod): void {
    this.uploadMethod = event;
  }

  onSubmit(): void {
    // TODO: submit form to service
    console.log(this.paramsForm.value);
    console.log(this.uploadMethod);
  }
}
