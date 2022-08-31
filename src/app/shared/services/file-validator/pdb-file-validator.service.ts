import { Injectable } from '@angular/core';
import { ValidationPayload } from '../../models/validation-payload.model';

@Injectable({
  providedIn: 'root',
})
export class PdbFileValidatorService {
  readonly validator = (fileContent: string[]): ValidationPayload => {
    let lineWithAtomExist = false;
    let lineWithHetatmExist = false;

    fileContent.every(line => {
      if (line.startsWith('ATOM')) {
        lineWithAtomExist = true;
        return false;
      }

      if (line.startsWith('HETATM')) {
        lineWithHetatmExist = true;
        return false;
      }

      return true;
    });

    const valid = lineWithAtomExist || lineWithHetatmExist;

    return {
      valid,
      message: !valid ? 'Given PDB file is invalid. Try another file.' : '',
    };
  };
}
