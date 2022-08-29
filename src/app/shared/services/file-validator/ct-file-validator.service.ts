import { Injectable } from '@angular/core';
import { ValidationPayload } from '../../models/validation-payload.model';
import { FileValidationUtils } from './file-validation-utils.ts.service';

@Injectable({
  providedIn: 'root',
})
export class CtFileValidatorService {
  constructor(private readonly utils: FileValidationUtils) {}

  readonly validator = (fileContent: string[]): ValidationPayload => {
    let lineHasSixCollumns = true;
    let firstCollumnIsNaturalWithoutZero = true;
    let secondCollumnIsString = true;
    let thirdCollumnIsNaturalWithZero = true;
    let fourthCollumnIsNaturalWithZero = true;
    let fifthCollumnIsNaturalWithZero = true;
    let sixthCollumnIsInteger = true;
    let firstAndFifthCollumnHaveCounterparts = true;
    let thirdCollumCountsUpFromZeroManyTimes = true;
    let fourthCollumnisBiggerThanThird = true;

    let previousThirdCollumnVal = -1;
    let previousFourthCollumnVal = -1;

    const firstline = fileContent[0].trim();
    if (this.utils.isNaturalWithoutZero(firstline)) {
      fileContent.shift();
    }

    fileContent.every(line => {
      if (this.utils.isComment(line) || this.utils.isEmpty(line)) {
        return true;
      }

      const columns = line.trim().split(' ');
      if (columns.length !== 6) {
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

      if (previousThirdCollumnVal !== -1) {
        if (columns[2] !== '0') {
          if (+columns[2] - 1 !== previousThirdCollumnVal) {
            thirdCollumCountsUpFromZeroManyTimes = false;
            return false;
          }
        }
      }
      previousThirdCollumnVal = +columns[2];

      if (previousFourthCollumnVal !== -1) {
        if (columns[3] !== '0') {
          if (columns[2] === '0' && previousFourthCollumnVal !== 0) {
            fourthCollumnisBiggerThanThird = false;
            return false;
          }

          if (+columns[2] + 2 !== +columns[3]) {
            fourthCollumnisBiggerThanThird = false;
            return false;
          }
        }
      }
      previousFourthCollumnVal = +columns[3];

      return true;
    });

    const valid = lineHasSixCollumns
      && firstCollumnIsNaturalWithoutZero
      && secondCollumnIsString
      && thirdCollumnIsNaturalWithZero
      && fourthCollumnIsNaturalWithZero
      && fifthCollumnIsNaturalWithZero
      && sixthCollumnIsInteger
      && firstAndFifthCollumnHaveCounterparts
      && thirdCollumCountsUpFromZeroManyTimes
      && fourthCollumnisBiggerThanThird;

    return {
      valid,
      message: !valid ? 'Given CT file is invalid. Try another file.' : '',
    };
  };
}
