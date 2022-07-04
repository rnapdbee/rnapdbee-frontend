import { Component } from '@angular/core';

export enum Upload {
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
  Upload: typeof Upload = Upload;
  
  get upload() { return this._upload }
  set upload(value: Upload) {
    this._upload = value;
  }
  private _upload = Upload.fromPDB

  onSubmit() {
    console.log(this.upload)
  }
}
