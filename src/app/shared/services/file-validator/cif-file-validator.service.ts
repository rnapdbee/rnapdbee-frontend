import { Injectable } from '@angular/core';
import { ValidationPayload } from '../../models/upload/validation-payload.model';

@Injectable({
  providedIn: 'root',
})
export class CifFileValidatorService {
  readonly validator = (fileContent: string[]): ValidationPayload => {
    let lineWithDataExist = false;
    let lineWithAtomExist = false;

    fileContent.every(line => {
      if (line.startsWith('data_')) {
        lineWithDataExist = true;
      }
      if (line.startsWith('_atom_site.')) {
        lineWithAtomExist = true;
      }
      return !(lineWithAtomExist && lineWithDataExist);
    });

    const valid = lineWithAtomExist && lineWithDataExist;

    return {
      valid,
      message: !valid ? 'Given mmCIF file is invalid. Try another file.' : '',
    };
  };
}
