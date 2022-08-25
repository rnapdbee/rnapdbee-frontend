import { CtFileValidatorService } from './ct-file-validator.service';
import { FileValidationUtils } from './file-validation-utils.ts.service';

describe('CtFileValidatorService', () => {
  let service: CtFileValidatorService;
  let fileContents: Array<string[]>;

  beforeEach(() => {
    service = new CtFileValidatorService(new FileValidationUtils());
  });

  it('invalidates when line has not six collumns', () => {
    fileContents = [
      ['1 G 0 2 3 1 G', '3 C 1 3 1 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when first collumn is not natural without zero', () => {
    fileContents = [
      ['0 G 0 2 3 1 G', '3 C 1 3 1 1'],
      ['-1 G 0 2 3 1 G', '3 C 1 3 1 1'],
      ['1.25 G 0 2 3 1 G', '3 C 1 3 1 1'],
      ['G G 0 2 3 1 G', '3 C 1 3 1 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when second collumn is not string', () => {
    fileContents = [
      ['1 1 0 2 3 1 G', '3 C 1 3 1 1'],
      ['1 -1 0 2 3 1 G', '3 C 1 3 1 1'],
      ['1 1.25 0 2 3 1 G', '3 C 1 3 1 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when third collumn is not natural with zero', () => {
    fileContents = [
      ['1 G -1 2 3 1', '3 C 1 3 1 1'],
      ['1 G C 2 3 1', '3 C 1 3 1 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when fourth collumn is not natural with zero', () => {
    fileContents = [
      ['1 G 0 2.25 3 1', '3 C 1 3 1 1'],
      ['1 G 0 -2 3 1', '3 C 1 3 1 1'],
      ['1 G 0 C 3 1', '3 C 1 3 1 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when fifth collumn is not natural with zero', () => {
    fileContents = [
      ['1 G 0 2 3.25 1', '3 C 1 3 1 1'],
      ['1 G 0 2 -3 1', '3 C 1 3 1 1'],
      ['1 G 0 2 C 1', '3 C 1 3 1 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when sixth collumn is not integer', () => {
    fileContents = [
      ['1 G 0 2 3 C', '3 C 1 3 1 1'],
      ['1 G 0 2 3 1.25', '3 C 1 3 1 1'],
      ['1 G 0 2 3 -1.25', '3 C 1 3 1 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when line has not a counterpart', () => {
    fileContents = [
      ['1 G 0 2 3 C'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when third collumn does not count up', () => {
    fileContents = [
      ['1 G 0 2 3 1', '3 C 2 2 1 1'],
      ['1 G 0 2 3 1', '3 C 1 3 1 1', '2 C 1 3 4 1', '4 G 2 4 2 1'],
      ['1 G 0 2 3 1', '3 C 1 3 1 1', '2 C 2 3 4 1', '4 G 1 4 2 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when fourth collumn is smaller than third by 2', () => {
    fileContents = [
      ['1 G 0 2 3 1', '3 C 1 4 1 1'],
      ['1 G 0 2 3 1', '3 C 1 2 1 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when fourth collumn is not zero when third is zero in next line', () => {
    fileContents = [
      ['1 G 0 2 3 1', '3 C 1 3 1 1', '2 C 2 4 4 1', '4 G 0 2 2 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('validates when all requirements have been met', () => {
    fileContents = [
      ['1 G 0 2 3 1', '3 C 1 3 1 1'],
      ['1 G 0 2 3 1', '3 C 1 3 1 1', '2 C 2 0 4 1', '4 G 0 2 2 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: true,
      }));
    });
  });
});
