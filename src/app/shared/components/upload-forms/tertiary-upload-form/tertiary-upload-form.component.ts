import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TERTIARY_TO_DBN_EXAMPLES } from 'src/app/shared/constants/tertiary-to-dbn-examples.const';
import { Example } from 'src/app/shared/models/example.model';
import { UploadMethod, UploadMethodType } from 'src/app/shared/models/upload-type.model';
import { ValidationPayload } from 'src/app/shared/models/validation-payload.model';
import { FileValidatorService } from 'src/app/shared/services/file-validator/file-validator.service';

@Component({
  selector: 'app-tertiary-upload-form',
  templateUrl: './tertiary-upload-form.component.html',
  styleUrls: ['./tertiary-upload-form.component.scss'],
})
export class TertiaryUploadFormComponent implements OnInit {
  @Output() uploadChange = new EventEmitter<UploadMethod>();
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement> | undefined;

  UploadType: typeof UploadMethodType = UploadMethodType;
  currentUploadType = this.UploadType.fromPDB;
  examples = TERTIARY_TO_DBN_EXAMPLES;

  get pdbId() { return this._pdbId; }
  set pdbId(value: string) { this.setAndValidatePdbId(value); }
  private _pdbId = '';
  pdbIdError: string | null = null;

  file: File | null = null;
  fileError: string | null = null;

  example: Example | null = null;

  constructor(private readonly fileValidatorService: FileValidatorService) { }

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

  onExampleSelect(event: Example): void {
    this.example = event;
    this.notifyChanges();
  }

  onMethodChange(): void {
    this.notifyChanges();
  }

  setAndValidateFile(file: File): void {
    this.fileValidatorService.validate(file, ['cif', 'pdb']).subscribe({
      next: (data: ValidationPayload) => {
        if (data.valid) {
          this.file = file;
          this.fileError = null;
          this.notifyChanges();
        } else {
          this.raiseFileError(data.message);
        }
      },
      error: (error: string) => {
        this.raiseFileError(error);
      },
    });
  }

  private raiseFileError(error: string) {
    this.fileError = error;
    this.file = null;
    this.clearFileInput();
    this.notifyChanges();
  }

  private clearFileInput() {
    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }
  }

  private setAndValidatePdbId(value: string): void {
    // TODO: implement validation for pdbId
    this._pdbId = value;
    this.notifyChanges();
  }

  private notifyChanges(): void {
    const payload: UploadMethod = {
      type: UploadMethodType.fromPDB,
      data: null,
      valid: false,
    };

    switch (this.currentUploadType) {
      case UploadMethodType.fromPDB:
        payload.type = UploadMethodType.fromPDB;
        payload.data = this.pdbId;
        payload.valid = !this.pdbIdError && !!this.pdbId;
        break;
      case UploadMethodType.fromLocalFile:
        payload.type = UploadMethodType.fromLocalFile;
        payload.data = this.file;
        payload.valid = this.fileError === null && !!this.file;
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
