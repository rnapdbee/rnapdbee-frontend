import { Injectable } from '@angular/core';
import { map, Observable, of, Subscriber } from 'rxjs';

export interface ValidationPayload {
  valid: boolean,
  message: string,
}
const EXTENSIONS = ['cif', 'bpseq', 'ct', 'dbn'] as const;
type Extension = typeof EXTENSIONS[number];

@Injectable({
  providedIn: 'root',
})
export class FileValidatorService {
  private readonly reader = new FileReader();

  validate(file: File, enabledExtensions: Extension[] = []): Observable<ValidationPayload> {
    const fileExtesion = file.name.split('.').pop();

    const extensionValidation = this.validateFileExtension(fileExtesion, enabledExtensions);
    if (!extensionValidation.valid) {
      return of(extensionValidation);
    }

    switch (fileExtesion) {
      case 'cif':
        return this.validateWith(file, this.cifValidator);
      case 'bpseq':
        return this.validateWith(file, this.bpseqValidator);
      case 'ct':
        return this.validateWith(file, this.ctValidator);
      case 'dbn':
        return this.validateWith(file, this.dbnValidator);
      default:
        throw new Error('Could not process file validation.');
    }
  }

  private validateFileExtension(fileExtesion: string | undefined, extensions: Extension[]): ValidationPayload {
    if (!fileExtesion) {
      return {
        valid: false,
        message: 'File extension could not be found.',
      };
    }

    if (!this.isFileExtensionSupported(fileExtesion)) {
      return {
        valid: false,
        message: `.${fileExtesion} files are not supported.`,
      };
    }

    if (!this.isInEnabledExtensions(fileExtesion, extensions)) {
      return {
        valid: false,
        message: 'This file type is incorrect for this scenario.',
      };
    }

    return {
      valid: true,
      message: 'File extension validation passed.',
    };
  }

  private isFileExtensionSupported(fileExtesion: string): boolean {
    return EXTENSIONS.indexOf(fileExtesion as Extension) > -1;
  }

  private isInEnabledExtensions(fileExtesion: string, enabledExtensions: Extension[]): boolean {
    return enabledExtensions.indexOf(fileExtesion as Extension) > -1;
  }

  private readonly cifValidator = (fileContent: string[]): ValidationPayload => {
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
      message: this.getMessage(valid, 'Given mmCIF file is invalid. Try another file.'),
    };
  };

  private readonly bpseqValidator = (fileContent: string[]): ValidationPayload => {
    let lineHasThreeCollumns = true;
    let firstCollumnIsNaturalWithoutZero = true;
    let secondCollumnIsString = true;
    let thirdCollumnIsNaturalWithZero = true;
    let firstAndThirdCollumAreNotEqual = true;
    let linesHaveCounterparts = true;

    fileContent.every(line => {
      // TODO: ignore empty lines?
      if (this.isComment(line) || this.isEmpty(line)) {
        return true;
      }

      const columns = line.split(' ');
      if (columns.length < 3) {
        lineHasThreeCollumns = false;
        return false;
      }

      if (!this.isNaturalWithoutZero(columns[0])) {
        firstCollumnIsNaturalWithoutZero = false;
        return false;
      }

      if (!this.isString(columns[1])) {
        secondCollumnIsString = false;
        return false;
      }

      if (!this.isNaturalWithZero(columns[2])) {
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
      message: this.getMessage(valid, 'Given BPSEQ file is invalid. Try another file.'),
    };
  };

  private readonly ctValidator = (fileContent: string[]): ValidationPayload => {
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
    if (this.isNaturalWithoutZero(firstline)) {
      fileContent.shift();
    }

    fileContent.every(line => {
      // TODO: ignore empty lines?
      if (this.isComment(line) || this.isEmpty(line)) {
        return true;
      }

      const columns = line.split(' ');
      if (columns.length < 6) {
        lineHasSixCollumns = false;
        return false;
      }

      if (!this.isNaturalWithoutZero(columns[0])) {
        firstCollumnIsNaturalWithoutZero = false;
        return false;
      }

      if (!this.isString(columns[1])) {
        secondCollumnIsString = false;
        return false;
      }

      if (!this.isNaturalWithZero(columns[2])) {
        thirdCollumnIsNaturalWithZero = false;
        return false;
      }

      if (!this.isNaturalWithZero(columns[3])) {
        fourthCollumnIsNaturalWithZero = false;
        return false;
      }

      if (!this.isNaturalWithZero(columns[4])) {
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
          if (+columns[2] < previousThirdCollumnVal) {
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
      message: this.getMessage(valid, 'Given CT file is invalid. Try another file.'),
    };
  };

  private readonly dbnValidator = (fileContent: string[]): ValidationPayload => {
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

  private validateWith(file: File, validator: (fileContent: string[]) => ValidationPayload): Observable<ValidationPayload> {
    return this.readFileContent(file).pipe(map((data: string[]) => validator(data)));
  }

  private readFileContent(file: File): Observable<string[]> {
    this.reader.readAsText(file);

    return new Observable<string[]>((observer: Subscriber<string[]>): void => {
      this.reader.onload = (progressEvent: ProgressEvent<FileReader>): void => {
        const result = progressEvent.target?.result?.toString();
        if (result) {
          observer.next(result.split(/\r\n|\n/));
          observer.complete();
        } else {
          observer.error('File could not be read properly');
        }
      };

      this.reader.onerror = (): void => {
        observer.error('File could not be loaded properly');
      };
    });
  }

  private isNaturalWithZero(value: string | number): boolean {
    if (Number.isNaN(+value)
      || !Number.isInteger(+value)
      || +value < 0) {
      return false;
    }
    return true;
  }

  private isNaturalWithoutZero(value: string | number): boolean {
    if (Number.isNaN(+value)
      || !Number.isInteger(+value)
      || +value <= 0) {
      return false;
    }
    return true;
  }

  private isComment(line: string) {
    return line.startsWith('#');
  }

  private isEmpty(line: string) {
    return line.trim() === '';
  }

  private isString(value: string) {
    return Number.isNaN(+value);
  }

  private getMessage(valid: boolean, errorMsg: string) {
    return !valid ? errorMsg : '';
  }
}
