import { Component } from '@angular/core';

export enum UploadMethod {
  fromPDB,
  fromLocalFile,
  fromExample
}

@Component({
  selector: 'app-teriary-to-dbn-input-form',
  templateUrl: './teriary-to-dbn-input-form.component.html',
  styleUrls: ['./teriary-to-dbn-input-form.component.scss']
})
export class TeriaryToDBNInputFormComponent {
  UploadMethod: typeof UploadMethod = UploadMethod;
  
  get uploadMethod() { return this._upload; }
  set uploadMethod(value: UploadMethod) { this._upload = value; }
  private _upload = UploadMethod.fromPDB

  get pdbId() { return this._pdbId; }
  set pdbId(value: string | null) { this._pdbId = value; }
  private _pdbId: string | null = null;

  get file() { return this._file; }
  set file(value: File | null) { this._file = value; }
  private _file: File | null = null;


  uploadFile(event: Event) {
    let files = (event.target as HTMLInputElement).files
    if (files && files?.length > 0) {
      let file = files[0]
      this.file = file;
    }
  }

  onSubmit() {
    console.log(this.uploadMethod)
  }
}
