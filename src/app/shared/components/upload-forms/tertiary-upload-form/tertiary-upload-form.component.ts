import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, Subscription, take } from 'rxjs';
import { TERTIARY_TO_DBN_EXAMPLES } from 'src/app/shared/constants/tertiary-to-dbn-examples.const';
import { FileExtension } from 'src/app/shared/models/file/file-extension.model';
import { Example } from 'src/app/shared/models/upload/example.model';
import { UploadMethod, UploadMethodType } from 'src/app/shared/models/upload/upload-type.model';
import { ValidationPayload } from 'src/app/shared/models/upload/validation-payload.model';
import { FileValidatorService } from 'src/app/shared/services/file-validator/file-validator.service';
import { NucleoSizeService } from 'src/app/shared/services/nucleosize/nucleosize.service';

@Component({
  selector: 'app-tertiary-upload-form',
  templateUrl: './tertiary-upload-form.component.html',
  styleUrls: ['./tertiary-upload-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class TertiaryUploadFormComponent implements OnInit, OnDestroy {
  @Output() uploadChange = new EventEmitter<UploadMethod>();
  @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement> | undefined;

  UploadType: typeof UploadMethodType = UploadMethodType;
  currentUploadType = this.UploadType.FromPDB;
  examples = TERTIARY_TO_DBN_EXAMPLES;

  get pdbId() { return this._pdbId; }
  set pdbId(value: string) { this.setAndValidatePdbId(value); }
  private _pdbId = '';
  pdbIdError: string | null = null;
  nucleoSizeError: string | null = null;

  file: File | null = null;
  fileError: string | null = null;
  allowedFileExtensions = [FileExtension.Cif, FileExtension.Pdb];

  example: Example | null = null;

  private readonly pdbIdSubject = new Subject<string>();
  private readonly pdbIdSubscription: Subscription;

  constructor(
    private readonly fileValidatorService: FileValidatorService,
    private readonly nucleoSizeService: NucleoSizeService,
  ) {
    this.pdbIdSubscription = this.pdbIdSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(pdbId => {
        if (this.isValidPdbId(pdbId)) {
          this.queryNucleoSize(pdbId);
        }
      });
  }

  ngOnInit(): void {
    this.notifyChanges();
  }

  ngOnDestroy(): void {
    this.pdbIdSubscription.unsubscribe();
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
    const pdbRegExpLong = /^[a-zA-Z0-9_]{12}$/;
    this._pdbId = value;
    this.nucleoSizeError = null;

    if (value.match(pdbRegExp) || value.match(pdbRegExpLong)) {
      this.pdbIdError = null;
      this.pdbIdSubject.next(value);
    } else if (value === '') {
      this.pdbIdError = '';
    } else {
      this.pdbIdError = 'PDB ID must consist of 4 or 12 characters (letters or digits)';
    }

    this.notifyChanges();
  }

  private isValidPdbId(value: string): boolean {
    const pdbRegExp = /^[a-zA-Z0-9]{4}$/;
    const pdbRegExpLong = /^[a-zA-Z0-9_]{12}$/;
    return !!value && (value.match(pdbRegExp) !== null || value.match(pdbRegExpLong) !== null);
  }

  private queryNucleoSize(pdbId: string): void {
    this.nucleoSizeService.getNucleicAcidLength(pdbId)
      .pipe(take(1))
      .subscribe({
        next: response => {
          if (response.total_na_length === 0) {
            this.nucleoSizeError = 'PDB ID does not contain nucleic acids';
          } else if (response.total_na_length > 4000) {
            this.nucleoSizeError = `Structure too large: ${response.total_na_length} nucleotides (max 4000 allowed)`;
          } else {
            this.nucleoSizeError = null;
          }
          this.notifyChanges();
        },
        error: (error: unknown) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.nucleoSizeError = 'PDB ID was not found';
            } else {
              console.log(`NucleoSize: Failed for ${pdbId} (Status: ${error.status})`);
            }
          } else {
            console.log(`NucleoSize: Failed for ${pdbId} (Status: unknown)`);
          }
          this.notifyChanges();
        },
      });
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
        payload.valid = this.pdbIdError === null && this.nucleoSizeError === null && !!this.pdbId;
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
