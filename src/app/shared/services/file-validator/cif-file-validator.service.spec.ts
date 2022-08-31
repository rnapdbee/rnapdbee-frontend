import { CifFileValidatorService } from './cif-file-validator.service';

describe('CifFileValidatorService', () => {
  let service: CifFileValidatorService;

  beforeEach(() => {
    service = new CifFileValidatorService();
  });

  it('invalidates when line with data_ not exists', () => {
    const fileContent = ['_atom_site.XYZ'];
    expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
      valid: false,
    }));
  });

  it('invalidates when line with _atom_site. not exists', () => {
    const fileContent = ['data_ XYZ'];
    expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
      valid: false,
    }));
  });

  it('validates when lines with data_ and _atom_site. exist', () => {
    const fileContent = ['data_XYZ', '_atom_site.XYZ'];
    expect(service.validator(fileContent)).toEqual(jasmine.objectContaining({
      valid: true,
    }));
  });
});
