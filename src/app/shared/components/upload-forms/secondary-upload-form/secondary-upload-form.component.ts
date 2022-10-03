import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  SECONDARY_TO_DBN_BPSEQ_EXAMPLES,
  SECONDARY_TO_DBN_CT_EXAMPLES,
  SECONDARY_TO_DBN_DBN_EXAMPLES,
} from 'src/app/shared/constants/secondary-to-dbn-examples.const';
import { Example } from 'src/app/shared/models/example.model';
import { FileExtension } from 'src/app/shared/models/file-extension.model';
import { UploadMethod, UploadMethodType } from 'src/app/shared/models/upload-type.model';
import { ValidationPayload } from 'src/app/shared/models/validation-payload.model';
import { FileValidatorService } from 'src/app/shared/services/file-validator/file-validator.service';

export enum ExampleType {
  None,
  BpseqExample,
  CtExample,
  DbnExample,
}

@Component({
  selector: 'app-secondary-upload-form',
  templateUrl: './secondary-upload-form.component.html',
  styleUrls: ['./secondary-upload-form.component.scss'],
})
export class SecondaryUploadFormComponent implements OnInit {
  @Output() uploadChange = new EventEmitter<UploadMethod>();
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement> | undefined;

  UploadType: typeof UploadMethodType = UploadMethodType;
  ExampleType: typeof ExampleType = ExampleType;
  currentUploadType = this.UploadType.FromLocalFile;
  bpseq_examples = SECONDARY_TO_DBN_BPSEQ_EXAMPLES;
  ct_examples = SECONDARY_TO_DBN_CT_EXAMPLES;
  dbn_examples = SECONDARY_TO_DBN_DBN_EXAMPLES;

  allowedFileExtensions = [FileExtension.Bpseq, FileExtension.Ct, FileExtension.Dbn];
  file: File | null = null;
  fileError: string | null = null;

  bpseqExample: Example | null = null;
  ctExample: Example | null = null;
  dbnExample: Example | null = null;
  selectedExample: ExampleType = ExampleType.None;

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

  isExampleChecked(selected: ExampleType): boolean {
    return this.selectedExample === selected
      && this.currentUploadType === this.UploadType.FromExample;
  }

  onBpseqExampleSelect(event: Example): void {
    this.bpseqExample = event;
    this.notifyChanges();
  }

  onCtExampleSelect(event: Example): void {
    this.ctExample = event;
    this.notifyChanges();
  }

  onDbnExampleSelect(event: Example): void {
    this.dbnExample = event;
    this.notifyChanges();
  }

  onExampleTypeChange(type: ExampleType): void {
    this.selectedExample = type;
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

  private notifyChanges(): void {
    const payload: UploadMethod = {
      type: UploadMethodType.FromLocalFile,
      data: null,
      valid: false,
    };

    switch (this.currentUploadType) {
      case UploadMethodType.FromLocalFile:
        payload.type = UploadMethodType.FromLocalFile;
        payload.data = this.file;
        payload.valid = this.fileError === null && !!this.file;
        break;
      case UploadMethodType.FromExample:
        payload.type = UploadMethodType.FromExample;
        payload.data = this.getCurrentExample();
        payload.valid = !!this.getCurrentExample();
        break;
      default:
        return;
    }
    this.uploadChange.emit(payload);
  }

  private getCurrentExample() {
    if (this.selectedExample === ExampleType.BpseqExample) {
      return this.bpseqExample;
    }

    if (this.selectedExample === ExampleType.CtExample) {
      return this.ctExample;
    }

    if (this.selectedExample === ExampleType.DbnExample) {
      return this.dbnExample;
    }

    return null;
  }
}
