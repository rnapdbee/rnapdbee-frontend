import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AnalisysTool, ModelSelection, NonCanonicalHandling, StructuralElementsHandling, VisualizationTool } from 'src/app/shared/constants/param-options.const';
import { TERTIARY_TO_DBN_EXAMPLES } from 'src/app/shared/constants/tertiary-to-dbn-examples.const';
import { Example } from 'src/app/shared/models/example.model';

export enum UploadMethod {
  fromPDB,
  fromLocalFile,
  fromExample
}

@Component({
  selector: 'app-tertiary-to-dbn-input-form',
  templateUrl: './tertiary-to-dbn-input-form.component.html',
  styleUrls: ['./tertiary-to-dbn-input-form.component.scss']
})
export class TertiaryToDBNInputFormComponent {
  examples = TERTIARY_TO_DBN_EXAMPLES;
  UploadMethod: typeof UploadMethod = UploadMethod;
  ModelSelection = ModelSelection;
  AnalisysTool = AnalisysTool;
  NonCanonicalHandling = NonCanonicalHandling;
  StructuralElementsHandling = StructuralElementsHandling;
  VisualizationTool = VisualizationTool;
  
  constructor(private readonly fb: FormBuilder) {}

  uploadMethod = UploadMethod.fromPDB;
  
  get pdbId() { return this._pdbId; }
  set pdbId(value: string | null) { this.setAndValidateId(value); }
  private _pdbId: string | null = null;
  _pdbIdError = '';
  
  file: File | null = null;
  _fileError = '';
  
  example: Example | null = null;

  paramsForm = this.fb.group({
    modelSelection: [ModelSelection[0].key],
    analisysTool: [AnalisysTool[0].key],
    nonCanonicalHandling: [NonCanonicalHandling[0].key],
    removeIsolated: [true],
    structuralElementsHandling: [StructuralElementsHandling[0].key],
    visualizationTool: [VisualizationTool[0].key],
  });
  
  uploadFile(event: Event) {
    let files = (event.target as HTMLInputElement).files;
    if (files && files?.length > 0) {
      let file = files[0];
      this.setAndValidateFile(file);
    }
  }

  setAndValidateId(value: string | null) {
    // TODO: implement validation for pdbId
    this._pdbId = value;
  }
  
  setAndValidateFile(file: File) {
    // TODO: implement validation for file
    this.file = file;
  }

  onExampleSelect(event: Example) {
    this.example = event;
  }
  
  onSubmit() {
    // TODO: submit form to service
    console.log(this.paramsForm.value);
  }
}
