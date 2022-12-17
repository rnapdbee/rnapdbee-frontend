import { FileExtension } from '../../models/file/file-extension.model';
import { ExtensionValidatorService } from './extension-validator.service';

describe('ExtensionValidatorService', () => {
  let service: ExtensionValidatorService;
  const validExtensions = Object.values(FileExtension);

  beforeEach(() => {
    service = new ExtensionValidatorService();
  });

  it('invalidates files without extension', () => {
    expect(service.validate('', validExtensions)).toEqual(jasmine.objectContaining({
      valid: false,
    }));
    expect(service.validate(undefined, validExtensions)).toEqual(jasmine.objectContaining({
      valid: false,
    }));
  });

  it('invalidates files with unsupported extension', () => {
    const unsupportedFileExtension = 'txt';
    expect(service.validate(unsupportedFileExtension, validExtensions)).toEqual(jasmine.objectContaining({
      valid: false,
    }));
  });

  it('invalidates valid extension when not enabled', () => {
    validExtensions.forEach(extension => {
      expect(service.validate(extension, [])).toEqual(jasmine.objectContaining({
        valid: false,
      }));
    });
  });

  it('validates valid extension when enabled', () => {
    validExtensions.forEach(extension => {
      expect(service.validate(extension, validExtensions)).toEqual(jasmine.objectContaining({
        valid: true,
      }));
    });
  });
});
