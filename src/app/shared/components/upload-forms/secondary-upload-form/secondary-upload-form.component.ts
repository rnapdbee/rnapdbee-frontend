import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {
  SECONDARY_TO_DBN_BPSEQ_EXAMPLES,
  SECONDARY_TO_DBN_CT_EXAMPLES,
  SECONDARY_TO_DBN_DBN_EXAMPLES,
} from 'src/app/shared/constants/secondary-to-dbn-examples.const';
import { FileExtension } from 'src/app/shared/models/file/file-extension.model';
import { Example } from 'src/app/shared/models/upload/example.model';
import { UploadMethod, UploadMethodType } from 'src/app/shared/models/upload/upload-type.model';
import { ValidationPayload } from 'src/app/shared/models/upload/validation-payload.model';
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
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
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
  dotBracketText = '';

  allowedFileExtensions = [FileExtension.Bpseq, FileExtension.Ct, FileExtension.Dbn];
  file: File | null = null;
  fileError: string | null = null;

  bpseqExample: Example | null = null;
  ctExample: Example | null = null;
  dbnExample: Example | null = null;
  selectedExample: ExampleType = ExampleType.None;

  // validate text input:
  textValidationError = '';
  isTextValid: boolean | null = null;

  // Method to validate structured text input

  validateStructuredText(): void {
    // Normalize ellipsis to three dots
    this.dotBracketText = this.dotBracketText.replace(/…/g, '...');
    const lines = this.dotBracketText?.split('\n').map(l => l.trim()) || [];
    this.textValidationError = '';
    this.isTextValid = null;

    if (lines.length % 3 !== 0) {
      this.textValidationError = 'Error: Input must be in blocks of 3 lines (name, sequence, brackets).';
      this.isTextValid = false;
      this.emitInvalid();
      return;
    }

    const allowedBrackets = /^[()[\]{}<>.-]+$/;
    const bracketPairs: [string, string][] = [['(', ')'], ['[', ']'], ['{', '}'], ['<', '>']];
    let allBrackets = '';
    for (let i = 0; i < lines.length; i += 3) {
      const name = lines[i];
      const brackets = lines[i + 2];
      allBrackets += brackets;
      const letters = lines[i + 1];
      let shouldSkip = false;
      if (!name || !brackets || !letters) {
        this.textValidationError += `Block starting at line ${i + 2} is incomplete.\n`;
        shouldSkip = true;
      }
      // added this because continue is forbidden by tslint
      if (!shouldSkip) {
        if (!allowedBrackets.test(brackets)) {
          this.textValidationError += `Line ${i + 1} contains invalid characters.\n`;
        }

        if (brackets.length !== letters.length) {
          this.textValidationError += `Line ${i + 2} and ${i + 3} must be the same length.\n`;
        }
        // ensure that lettes are valid characters (A, U, C, G, T)
        if (!/^[aucgtAUCGT]+$/.test(letters)) {
          this.textValidationError += `Line ${i + 1} contains invalid characters. Only A, U, C, G are allowed.\n`;
        }
      }
    }
    bracketPairs.forEach(([open, close]) => {
      const openCount = (allBrackets.match(new RegExp(`\\${open}`, 'g')) || []).length;
      const closeCount = (allBrackets.match(new RegExp(`\\${close}`, 'g')) || []).length;

      if (openCount !== closeCount) {
        if (openCount > closeCount) {
          this.textValidationError += `Lacking '${close}' bracket.\n`;
        } else {
          this.textValidationError += `Lacking '${open}' bracket .\n`;
        }
      }
    });

    if (this.textValidationError) {
      this.isTextValid = false;
      this.emitInvalid();
    } else {
      this.isTextValid = true;
      this.uploadChange.emit({
        type: UploadMethodType.FromLocalFile,
        data: this.dotBracketText,
        valid: true,
      });
    }
    this.notifyChanges();
  }

  private emitInvalid(): void {
    this.uploadChange.emit({
      type: UploadMethodType.FromLocalFile,
      data: null,
      valid: false,
    });
  }

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
    this.currentUploadType = this.UploadType.FromDotBracket;

    fetch(event.path)
      .then(r => r.text())
      .then(rawTxt => {
        // remove last empty line (and also trailing spaces)
        const cleanedTxt = rawTxt.replace(/\s+$/, '');
        this.dotBracketText = cleanedTxt;
        this.validateStructuredText();
        this.notifyChanges();
      })
      .catch(err => {
        console.error('Failed to load DBN example file', err);
      });
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
      case UploadMethodType.FromDotBracket:
        payload.type = UploadMethodType.FromDotBracket;
        payload.data = this.dotBracketText;
        payload.valid = this.isTextValid === true;
        if (!payload.valid) {
          this.textValidationError += 'Invalid dot-bracket text input.\n';
        }
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
