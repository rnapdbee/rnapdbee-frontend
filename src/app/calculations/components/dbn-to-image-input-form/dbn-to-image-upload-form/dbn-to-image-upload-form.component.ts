import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DBN_TO_IMAGE_EXAMPLES } from 'src/app/shared/constants/dbn-to-image-examples.const';
import { Example } from 'src/app/shared/models/example.model';
import { UploadMethod, UploadMethodType } from 'src/app/shared/models/upload-type.model';

@Component({
  selector: 'app-dbn-to-image-upload-form',
  templateUrl: './dbn-to-image-upload-form.component.html',
  styleUrls: ['./dbn-to-image-upload-form.component.scss']
})
export class DbnToImageUploadFormComponent implements OnInit {

  @Output() uploadChange = new EventEmitter<UploadMethod>()

  UploadType: typeof UploadMethodType = UploadMethodType;
  currentUploadType = this.UploadType.fromLocalFile;
  examples = DBN_TO_IMAGE_EXAMPLES;

  file: File | null = null;
  _fileError = '';

  example: Example | null = null;

  ngOnInit() {
    this.notifyChanges();
  }

  uploadFile(event: Event) {
    let files = (event.target as HTMLInputElement).files;
    if (files && files?.length > 0) {
      let file = files[0];
      this.setAndValidateFile(file);
    }
  }

  setAndValidateFile(file: File) {
    // TODO: implement validation for file
    this.file = file;
    this.notifyChanges();
  }

  onExampleSelect(event: Example) {
    this.example = event;
    this.notifyChanges();
  }

  onMethodChange() {
    this.notifyChanges();
  }

  notifyChanges() {
    let payload: UploadMethod = {
      type: UploadMethodType.fromLocalFile,
      data: null,
      valid: false,
    };

    switch (this.currentUploadType) {
      case UploadMethodType.fromLocalFile:
        payload.type = UploadMethodType.fromLocalFile;
        payload.data = this.file;
        payload.valid = !this._fileError && !!this.file;
        break;
      case UploadMethodType.fromExample:
        payload.type = UploadMethodType.fromExample;
        payload.data = this.example;
        payload.valid = !!this.example;
        break;
      default:
        return;
    }

    this.uploadChange.emit(payload);
  }
}
