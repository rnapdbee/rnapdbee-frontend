import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TERTIARY_TO_MULTI_EXAMPLES } from 'src/app/shared/constants/tertiary-to-multi-examples.const';
import { Example } from 'src/app/shared/models/example.model';
import { UploadMethod, UploadMethodType } from 'src/app/shared/models/upload-type.model';

@Component({
  selector: 'app-tertiary-to-multi-upload-form',
  templateUrl: './tertiary-to-multi-upload-form.component.html',
  styleUrls: ['./tertiary-to-multi-upload-form.component.scss']
})
export class TertiaryToMultiUploadFormComponent implements OnInit {

  @Output() uploadChange = new EventEmitter<UploadMethod>()

  UploadType: typeof UploadMethodType = UploadMethodType;
  currentUploadType = this.UploadType.fromPDB;
  examples = TERTIARY_TO_MULTI_EXAMPLES;

  get pdbId() { return this._pdbId; }
  set pdbId(value: string) { this.setAndValidatePdbId(value); }
  private _pdbId = '';
  _pdbIdError = '';

  file: File | null = null;
  _fileError = '';

  example: Example | null = null;

  ngOnInit(): void {
    this.notifyChanges();
  }

  uploadFile(event: Event): void {
    let files = (event.target as HTMLInputElement).files;
    if (files && files?.length > 0) {
      let file = files[0];
      this.setAndValidateFile(file);
    }
  }

  setAndValidatePdbId(value: string): void {
    // TODO: implement validation for pdbId
    this._pdbId = value;
    this.notifyChanges();
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
    let payload: UploadMethod = {
      type: UploadMethodType.fromPDB,
      data: null,
      valid: false,
    };

    switch (this.currentUploadType) {
      case UploadMethodType.fromPDB:
        payload.type = UploadMethodType.fromPDB;
        payload.data = this.pdbId;
        payload.valid = !this._pdbIdError && !!this.pdbId;
        break;
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
