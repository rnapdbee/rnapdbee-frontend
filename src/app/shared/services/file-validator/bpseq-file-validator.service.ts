import { Injectable } from '@angular/core';
import { ValidationPayload } from '../../models/upload/validation-payload.model';
import { FileValidationUtils } from './file-validation-utils.ts.service';

@Injectable({
  providedIn: 'root',
})
export class BpseqFileValidatorService {
  constructor(private readonly utils: FileValidationUtils) {}

  readonly validator = (fileContent: string[]): ValidationPayload => {
    let lineHasThreeCollumns = true;
    let firstCollumnIsNaturalWithoutZero = true;
    let secondCollumnIsString = true;
    let thirdCollumnIsNaturalWithZero = true;
    let firstAndThirdCollumAreNotEqual = true;
    let linesHaveCounterparts = true;

    fileContent.every(line => {
      if (this.utils.isComment(line) || this.utils.isEmpty(line)) {
        return true;
      }

      const columns = line.trim().split(' ');
      if (columns.length !== 3) {
        lineHasThreeCollumns = false;
        return false;
      }

      if (!this.utils.isNaturalWithoutZero(columns[0])) {
        firstCollumnIsNaturalWithoutZero = false;
        return false;
      }

      if (!this.utils.isString(columns[1])) {
        secondCollumnIsString = false;
        return false;
      }

      if (!this.utils.isNaturalWithZero(columns[2])) {
        thirdCollumnIsNaturalWithZero = false;
        return false;
      }

      if (columns[0] === columns[1]) {
        firstAndThirdCollumAreNotEqual = false;
        return false;
      }

      if (columns[2] !== '0') {
        const counterpart = fileContent.find(item => {
          const itemCollumns = item.split(' ');
          return itemCollumns[0] === columns[2]
            && itemCollumns[2] === columns[0];
        });
        if (!counterpart) {
          linesHaveCounterparts = false;
          return false;
        }
      }

      return true;
    });

    const valid = lineHasThreeCollumns
      && firstCollumnIsNaturalWithoutZero
      && secondCollumnIsString
      && thirdCollumnIsNaturalWithZero
      && firstAndThirdCollumAreNotEqual
      && linesHaveCounterparts;

    return {
      valid,
      message: !valid ? 'Given BPSEQ file is invalid. Try another file.' : '',
    };
  };
}
