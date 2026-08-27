import { beforeEach, describe, expect, it } from 'vitest';
import { DbnFileValidatorService } from './dbn-file-validator.service';

describe('DbnFileValidatorService', () => {
  let service: DbnFileValidatorService;

  beforeEach(() => {
    service = new DbnFileValidatorService();
  });

  it('invalidates when regex dont match', () => {
    const fileContent = ['ABCD', '>XYZ'];
    expect(service.validator(fileContent)).toEqual(expect.objectContaining({
      valid: false,
    }));
  });

  it('validates when regex match', () => {
    const fileContent = [
      '>strand_A',
      '>gCGGAUUUAgCUCAGuuGGGAGAGCgCCAGAcUgAAgAucUGGAGgUCcUGUGuuCGaUCCACAGAAUUCGCACCA',
      '(((((((..((((.....[..)))).((((.........)))).....(((((..]....))))))))))))....',
    ];
    expect(service.validator(fileContent)).toEqual(expect.objectContaining({
      valid: true,
    }));
  });
});
