import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SECONDARY_TO_DBN_BPSEQ_EXAMPLES, SECONDARY_TO_DBN_CT_EXAMPLES } from 'src/app/shared/constants/secondary-to-dbn-examples.const';
import { Example } from 'src/app/shared/models/example.model';
import { UploadMethod, UploadMethodType } from 'src/app/shared/models/upload-type.model';

@Component({
  selector: 'app-secondary-to-dbn-upload-form',
  templateUrl: './secondary-to-dbn-upload-form.component.html',
  styleUrls: ['./secondary-to-dbn-upload-form.component.scss']
})
export class SecondaryToDbnUploadFormComponent implements OnInit {

  @Output() uploadChange = new EventEmitter<UploadMethod>()

  UploadType: typeof UploadMethodType = UploadMethodType;
  currentUploadType = this.UploadType.fromLocalFile;
  bpseq_examples = SECONDARY_TO_DBN_BPSEQ_EXAMPLES;
  ct_examples = SECONDARY_TO_DBN_CT_EXAMPLES;

  file: File | null = null;
  _fileError = '';

  bpseqExample: Example | null = null;
  ctExample: Example | null = null;
  exampleType: string = '';
  
  ngOnInit(): void {
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

  isExampleChecked(type: string) {
    return this.exampleType === type &&
      this.currentUploadType === this.UploadType.fromExample;
  }

  onBpseqExampleSelect(event: Example) {
    this.bpseqExample = event;
    this.notifyChanges();
  }

  onCtExampleSelect(event: Example) {
    this.ctExample = event;
    this.notifyChanges();
  }

  onExampleTypeChange(type: string) {
    this.exampleType = type;
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
        payload.data = this.exampleType === 'bpseq' ? this.bpseqExample : this.ctExample;
        payload.valid = this.exampleType === 'bpseq' ? !!this.bpseqExample : !!this.ctExample;
        break;
      default:
        return;
    }

    this.uploadChange.emit(payload);
  }
}
