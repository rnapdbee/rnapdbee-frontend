import { DbnFileValidatorService } from './dbn-file-validator.service';

describe('DbnFileValidatorService', () => {
  let service: DbnFileValidatorService;

  beforeEach(() => {
    service = new DbnFileValidatorService();
  });

  it('invalidates when regex dont match', () => {
    const fileContent = ['ABCD', '>XYZ'];
    expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
      valid: false,
    }));
  });

  it('validates when regex match', () => {
    const fileContent = [
      '>strand_A',
      '>gCGGAUUUAgCUCAGuuGGGAGAGCgCCAGAcUgAAgAucUGGAGgUCcUGUGuuCGaUCCACAGAAUUCGCACCA',
      '(((((((..((((.....[..)))).((((.........)))).....(((((..]....))))))))))))....',
    ];
    expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
      valid: true,
    }));
  });
});
