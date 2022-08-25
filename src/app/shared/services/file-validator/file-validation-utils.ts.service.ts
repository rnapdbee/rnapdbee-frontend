import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileValidationUtils {
  isNaturalWithZero(value: string | number): boolean {
    if (Number.isNaN(+value)
      || !Number.isInteger(+value)
      || +value < 0) {
      return false;
    }
    return true;
  }

  isNaturalWithoutZero(value: string | number): boolean {
    if (Number.isNaN(+value)
      || !Number.isInteger(+value)
      || +value <= 0) {
      return false;
    }
    return true;
  }

  isComment(line: string) {
    return line.startsWith('#');
  }

  isEmpty(line: string) {
    return line.trim() === '';
  }

  isString(value: string) {
    return Number.isNaN(+value);
  }
}
