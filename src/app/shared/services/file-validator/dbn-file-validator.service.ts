import { Injectable } from '@angular/core';
import { ValidationPayload } from '../../models/validation-payload.model';

@Injectable({
  providedIn: 'root',
})
export class DbnFileValidatorService {
  readonly validator = (fileContent: string[]): ValidationPayload => {
    const dbnRegExp = /(>.+\r?\n)?([ACGUTRYNacgutryn]+)\r?\n([-.()[\]{}<>A-Za-z]+)/;

    const fileString = fileContent.toString().replace(/,/gi, '\n');

    if (fileString.match(dbnRegExp)) {
      return {
        valid: true,
        message: '',
      };
    }

    return {
      valid: false,
      message: 'Given DBN file is invalid. Try another file.',
    };
  };
}
