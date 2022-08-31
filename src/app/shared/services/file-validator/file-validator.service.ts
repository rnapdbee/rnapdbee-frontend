import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ValidationPayload } from '../../models/validation-payload.model';
import { BpseqFileValidatorService } from './bpseq-file-validator.service';
import { CifFileValidatorService } from './cif-file-validator.service';
import { CtFileValidatorService } from './ct-file-validator.service';
import { DbnFileValidatorService } from './dbn-file-validator.service';
import { Extension, EXTENSIONS, ExtensionValidatorService } from './extension-validator.service';
import { FileReaderService } from './file-reader.service';
import { PdbFileValidatorService } from './pdb-file-validator.service';


@Injectable({
  providedIn: 'root',
})
export class FileValidatorService {
  constructor(
    private readonly fileReader: FileReaderService,
    private readonly extensionValidatorService: ExtensionValidatorService,
    private readonly cifValidator: CifFileValidatorService,
    private readonly pdbValidator: PdbFileValidatorService,
    private readonly bpseqValidator: BpseqFileValidatorService,
    private readonly ctValidator: CtFileValidatorService,
    private readonly dbnValidator: DbnFileValidatorService,
  ) {}

  validate(file: File, enabledExtensions: Extension[] = EXTENSIONS.flat()): Observable<ValidationPayload> {
    const fileExtesion = file.name.split('.').pop();

    const extensionValidation = this.extensionValidatorService.validate(fileExtesion, enabledExtensions);
    if (!extensionValidation.valid) {
      return of(extensionValidation);
    }

    switch (fileExtesion) {
      case 'cif':
        return this.validateWith(file, this.cifValidator.validator);
      case 'pdb':
        return this.validateWith(file, this.pdbValidator.validator);
      case 'bpseq':
        return this.validateWith(file, this.bpseqValidator.validator);
      case 'ct':
        return this.validateWith(file, this.ctValidator.validator);
      case 'dbn':
        return this.validateWith(file, this.dbnValidator.validator);
      default:
        throw new Error('Could not process file validation.');
    }
  }

  private validateWith(file: File, validator: (fileContent: string[]) => ValidationPayload): Observable<ValidationPayload> {
    return this.fileReader.readFileContent(file).pipe(map((data: string[]) => validator(data)));
  }
}
