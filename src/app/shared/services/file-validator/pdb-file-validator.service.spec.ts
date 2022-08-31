import { PdbFileValidatorService } from './pdb-file-validator.service';

describe('PdbFileValidatorService', () => {
  let service: PdbFileValidatorService;

  beforeEach(() => {
    service = new PdbFileValidatorService();
  });

  it('invalidates when line with ATOM and HETATM not exists', () => {
    const fileContent = ['HEADER X X X X', 'COMPND   3 CHAIN: A'];
    expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
      valid: false,
    }));
  });

  it('validates when line with ATOM exist', () => {
    const fileContent = ['ATOM'];
    expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
      valid: true,
    }));
  });

  it('validates when line with HETATM exist', () => {
    const fileContent = ['HETATM'];
    expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
      valid: true,
    }));
  });
});
