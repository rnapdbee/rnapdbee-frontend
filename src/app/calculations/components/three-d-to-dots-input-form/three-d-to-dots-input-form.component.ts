import { Component } from '@angular/core';

export enum Upload {
  fromPDB,
  fromLocalFile,
  fromExample
}

@Component({
  selector: 'app-three-d-to-dots-input-form',
  templateUrl: './three-d-to-dots-input-form.component.html',
  styleUrls: ['./three-d-to-dots-input-form.component.scss']
})
export class ThreeDToDotsInputFormComponent {
  Upload: typeof Upload = Upload;
  
  constructor() { }

  get upload() { return this._upload }
  set upload(value: Upload) {
    this._upload = value;
  }
  private _upload = Upload.fromPDB

  onSubmit() {
    console.log(this.upload)
  }
}
