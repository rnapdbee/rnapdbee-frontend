import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  SECONDARY_TO_DBN_BPSEQ_EXAMPLES,
  SECONDARY_TO_DBN_CT_EXAMPLES,
  SECONDARY_TO_DBN_DBN_EXAMPLES,
} from 'src/app/shared/constants/secondary-to-dbn-examples.const';
import { Example } from 'src/app/shared/models/example.model';
import { UploadMethod, UploadMethodType } from 'src/app/shared/models/upload-type.model';
import { ValidationPayload } from 'src/app/shared/models/validation-payload.model';
import { FileValidatorService } from 'src/app/shared/services/file-validator/file-validator.service';

type ExampleType = 'bpseq' | 'ct' | 'dbn' | null;

@Component({
  selector: 'app-secondary-upload-form',
  templateUrl: './secondary-upload-form.component.html',
  styleUrls: ['./secondary-upload-form.component.scss'],
})
export class SecondaryUploadFormComponent implements OnInit {
  @Output() uploadChange = new EventEmitter<UploadMethod>();
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement> | undefined;

  UploadType: typeof UploadMethodType = UploadMethodType;
  currentUploadType = this.UploadType.fromLocalFile;
  bpseq_examples = SECONDARY_TO_DBN_BPSEQ_EXAMPLES;
  ct_examples = SECONDARY_TO_DBN_CT_EXAMPLES;
  dbn_examples = SECONDARY_TO_DBN_DBN_EXAMPLES;

  file: File | null = null;
  fileError: string | null = null;

  bpseqExample: Example | null = null;
  ctExample: Example | null = null;
  dbnExample: Example | null = null;
  exampleType: ExampleType = null;

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

  isExampleChecked(type: ExampleType): boolean {
    return this.exampleType === type
      && this.currentUploadType === this.UploadType.fromExample;
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
    this.exampleType = type;
    this.notifyChanges();
  }

  onMethodChange(): void {
    this.notifyChanges();
  }

  setAndValidateFile(file: File): void {
    this.fileValidatorService.validate(file, ['bpseq', 'ct', 'dbn']).subscribe({
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
      type: UploadMethodType.fromLocalFile,
      data: null,
      valid: false,
    };

    switch (this.currentUploadType) {
      case UploadMethodType.fromLocalFile:
        payload.type = UploadMethodType.fromLocalFile;
        payload.data = this.file;
        payload.valid = this.fileError === null && !!this.file;
        break;
      case UploadMethodType.fromExample:
        payload.type = UploadMethodType.fromExample;
        payload.data = this.getCurrentExample();
        payload.valid = !!this.getCurrentExample();
        break;
      default:
        return;
    }

    this.uploadChange.emit(payload);
  }

  private getCurrentExample() {
    if (this.exampleType === 'bpseq') {
      return this.bpseqExample;
    }

    if (this.exampleType === 'ct') {
      return this.ctExample;
    }

    if (this.exampleType === 'dbn') {
      return this.dbnExample;
    }

    return null;
  }
}
