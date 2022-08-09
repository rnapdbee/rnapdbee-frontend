import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SECONDARY_TO_DBN_BPSEQ_EXAMPLES, SECONDARY_TO_DBN_CT_EXAMPLES } from 'src/app/shared/constants/secondary-to-dbn-examples.const';
import { Example } from 'src/app/shared/models/example.model';
import { UploadMethod, UploadMethodType } from 'src/app/shared/models/upload-type.model';

@Component({
  selector: 'app-secondary-upload-form',
  templateUrl: './secondary-upload-form.component.html',
  styleUrls: ['./secondary-upload-form.component.scss'],
})
export class SecondaryUploadFormComponent implements OnInit {
  @Output() uploadChange = new EventEmitter<UploadMethod>();

  UploadType: typeof UploadMethodType = UploadMethodType;
  currentUploadType = this.UploadType.fromLocalFile;
  bpseq_examples = SECONDARY_TO_DBN_BPSEQ_EXAMPLES;
  ct_examples = SECONDARY_TO_DBN_CT_EXAMPLES;

  file: File | null = null;
  _fileError = '';

  bpseqExample: Example | null = null;
  ctExample: Example | null = null;
  exampleType = '';

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

  isExampleChecked(type: string): boolean {
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

  onExampleTypeChange(type: string): void {
    this.exampleType = type;
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
        payload.data = this.exampleType === 'bpseq' ? this.bpseqExample : this.ctExample;
        payload.valid = this.exampleType === 'bpseq' ? !!this.bpseqExample : !!this.ctExample;
        break;
      default:
        return;
    }

    this.uploadChange.emit(payload);
  }
}
