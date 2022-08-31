import { BpseqFileValidatorService } from './bpseq-file-validator.service';
import { FileValidationUtils } from './file-validation-utils.ts.service';

describe('BpseqFileValidatorService', () => {
  let service: BpseqFileValidatorService;
  let fileContents: Array<string[]>;

  beforeEach(() => {
    service = new BpseqFileValidatorService(new FileValidationUtils());
  });

  it('invalidates when line has not three collumns', () => {
    fileContents = [
      ['1 G 2 U', '2 G 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when first collumn is not natural without zero', () => {
    fileContents = [
      ['0 G 2', '2 G 1'],
      ['-1 G 2', '2 G 1'],
      ['1.25 G 2', '2 G 1'],
      ['A G 2', '2 G 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when second collumn is not string', () => {
    fileContents = [
      ['1 1 2', '2 G 1'],
      ['1 -1 2', '2 G 1'],
      ['1 1.25 2', '2 G 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when third collumn is not natural with zero', () => {
    fileContents = [
      ['1 G -1', '2 G 1'],
      ['1 G 1.25', '2 G 1'],
      ['1 G G', '2 G 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when first and third collumn are equal', () => {
    fileContents = [
      ['1 G 2', '1 G 2'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('invalidates when line has not a counterpart', () => {
    fileContents = [
      ['1 G 2'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('validates when all requirements have been met', () => {
    fileContents = [
      ['1 G 2', '2 G 1'],
    ];

    fileContents.forEach(fileContent => {
      expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
        valid: true,
      }));
    });
  });
});
