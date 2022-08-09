import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DBN_TO_IMAGE_EXAMPLES } from 'src/app/shared/constants/dbn-to-image-examples.const';
import { Example } from 'src/app/shared/models/example.model';
import { UploadMethod, UploadMethodType } from 'src/app/shared/models/upload-type.model';

@Component({
  selector: 'app-dbn-upload-form',
  templateUrl: './dbn-upload-form.component.html',
  styleUrls: ['./dbn-upload-form.component.scss'],
})
export class DbnUploadFormComponent implements OnInit {
  @Output() uploadChange = new EventEmitter<UploadMethod>();

  UploadType: typeof UploadMethodType = UploadMethodType;
  currentUploadType = this.UploadType.fromLocalFile;
  examples = DBN_TO_IMAGE_EXAMPLES;

  file: File | null = null;
  _fileError = '';

  example: Example | null = null;

  ngOnInit(): void {
    this.notifyChanges();
  }

  uploadFile(event: Event): void {
    const { files } = event.target as HTMLInputElement;
    if (files && files?.length > 0) {
      const file = files[0];
      this.setAndValidateFile(file);
    }
  }

  setAndValidateFile(file: File): void {
    // TODO: implement validation for file
    this.file = file;
    this.notifyChanges();
  }

  onExampleSelect(event: Example): void {
    this.example = event;
    this.notifyChanges();
  }

  onMethodChange(): void {
    this.notifyChanges();
  }

  notifyChanges(): void {
    const payload: UploadMethod = {
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
