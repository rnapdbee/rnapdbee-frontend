import { Injectable } from '@angular/core';
import { ValidationPayload } from '../../models/upload/validation-payload.model';
import { FileValidationUtils } from './file-validation-utils.ts.service';

@Injectable({
  providedIn: 'root',
})
export class CtFileValidatorService {
  constructor(private readonly utils: FileValidationUtils) {}

  readonly validator = (fileContent: string[]): ValidationPayload => {
    let atLeastOneFunctionalLine = false;
    let lineHasSixCollumns = true;
    let firstCollumnIsNaturalWithoutZero = true;
    let secondCollumnIsString = true;
    let thirdCollumnIsNaturalWithZero = true;
    let fourthCollumnIsNaturalWithZero = true;
    let fifthCollumnIsNaturalWithZero = true;
    let sixthCollumnIsInteger = true;
    let firstAndFifthCollumnHaveCounterparts = true;

    const firstline = fileContent[0].trim().split(' ');
    if (firstline.length === 1 && this.utils.isNaturalWithoutZero(firstline[0])) {
      fileContent.shift();
    }

    if (firstline.length !== 1 && this.utils.isNaturalWithoutZero(firstline[0]) && firstline[1].startsWith('#')) {
      fileContent.shift();
    }

    fileContent.every(line => {
      if (this.utils.isComment(line) || this.utils.isEmpty(line)) {
        return true;
      }

      atLeastOneFunctionalLine = true;

      const columns = line.trim().split(' ');
      if (columns.length < 6) {
        lineHasSixCollumns = false;
        return false;
      }

      if (columns.length > 6 && !columns[6].startsWith('#')) {
        lineHasSixCollumns = false;
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

      if (!this.utils.isNaturalWithZero(columns[3])) {
        fourthCollumnIsNaturalWithZero = false;
        return false;
      }

      if (!this.utils.isNaturalWithZero(columns[4])) {
        fifthCollumnIsNaturalWithZero = false;
        return false;
      }

      if (!Number.isInteger(+columns[5])) {
        sixthCollumnIsInteger = false;
        return false;
      }

      if (columns[4] !== '0') {
        const counterpart = fileContent.find(item => {
          const itemCollumns = item.split(' ');
          return itemCollumns[0] === columns[4]
            && itemCollumns[4] === columns[0];
        });
        if (!counterpart) {
          firstAndFifthCollumnHaveCounterparts = false;
          return false;
        }
      }

      return true;
    });

    const valid = atLeastOneFunctionalLine
      && lineHasSixCollumns
      && firstCollumnIsNaturalWithoutZero
      && secondCollumnIsString
      && thirdCollumnIsNaturalWithZero
      && fourthCollumnIsNaturalWithZero
      && fifthCollumnIsNaturalWithZero
      && sixthCollumnIsInteger
      && firstAndFifthCollumnHaveCounterparts;

    return {
      valid,
      message: !valid ? 'Given CT file is invalid. Try another file.' : '',
    };
  };
}
