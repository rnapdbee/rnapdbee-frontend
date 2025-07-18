import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TERTIARY_TO_DBN_EXAMPLES } from 'src/app/shared/constants/tertiary-to-dbn-examples.const';
import { FileExtension } from 'src/app/shared/models/file/file-extension.model';
import { Example } from 'src/app/shared/models/upload/example.model';
import { UploadMethod, UploadMethodType } from 'src/app/shared/models/upload/upload-type.model';
import { ValidationPayload } from 'src/app/shared/models/upload/validation-payload.model';
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
  currentUploadType = this.UploadType.FromPDB;
  examples = TERTIARY_TO_DBN_EXAMPLES;

  get pdbId() { return this._pdbId; }
  set pdbId(value: string) { this.setAndValidatePdbId(value); }
  private _pdbId = '';
  pdbIdError: string | null = null;

  file: File | null = null;
  fileError: string | null = null;
  allowedFileExtensions = [FileExtension.Cif, FileExtension.Pdb];

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
    this.fileValidatorService.validate(file, this.allowedFileExtensions).subscribe({
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

  clearPdbIdInput() {
    this.pdbId = '';
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
    const pdbRegExp = /^[a-zA-Z0-9]{4}$/;
    this._pdbId = value;

    if (value.match(pdbRegExp)) {
      this.pdbIdError = null;
    } else if (value === '') {
      this.pdbIdError = '';
    } else {
      this.pdbIdError = 'PDB ID must contain of 4 characters (letters or digits)';
    }

    this.notifyChanges();
  }

  private notifyChanges(): void {
    const payload: UploadMethod = {
      type: UploadMethodType.FromPDB,
      data: null,
      valid: false,
    };

    switch (this.currentUploadType) {
      case UploadMethodType.FromPDB:
        payload.type = UploadMethodType.FromPDB;
        payload.data = this.pdbId;
        payload.valid = this.pdbIdError === null && !!this.pdbId;
        break;
      case UploadMethodType.FromLocalFile:
        payload.type = UploadMethodType.FromLocalFile;
        payload.data = this.file;
        payload.valid = this.fileError === null && !!this.file;
        break;
      case UploadMethodType.FromExample:
        payload.type = UploadMethodType.FromExample;
        payload.data = this.example;
        payload.valid = !!this.example;
        break;
      default:
        return;
    }

    this.uploadChange.emit(payload);
  }
}
