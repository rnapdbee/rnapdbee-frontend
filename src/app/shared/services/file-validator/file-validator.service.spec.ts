import { beforeEach, describe, expect, it, type MockedObject, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ValidationPayload } from '../../models/upload/validation-payload.model';
import { BpseqFileValidatorService } from './bpseq-file-validator.service';
import { CifFileValidatorService } from './cif-file-validator.service';
import { CtFileValidatorService } from './ct-file-validator.service';
import { DbnFileValidatorService } from './dbn-file-validator.service';
import { ExtensionValidatorService } from './extension-validator.service';
import { FileReaderService } from './file-reader.service';
import { FileValidatorService } from './file-validator.service';
import { PdbFileValidatorService } from './pdb-file-validator.service';

describe('FileValidatorService', () => {
  let service: FileValidatorService;
  let fileReaderSpy: MockedObject<FileReaderService>;
  let extensionValidatorSpy: MockedObject<ExtensionValidatorService>;
  let cifValidatorSpy: MockedObject<CifFileValidatorService>;
  let pdbValidatorSpy: MockedObject<PdbFileValidatorService>;
  let bpseqValidatorSpy: MockedObject<BpseqFileValidatorService>;
  let ctValidatorSpy: MockedObject<CtFileValidatorService>;
  let dbnValidatorSpy: MockedObject<DbnFileValidatorService>;

  const validPayload: ValidationPayload = {
    valid: true,
    message: '',
  };

  const invalidPayload: ValidationPayload = {
    valid: false,
    message: '',
  };

  beforeEach(() => {
    fileReaderSpy = {
      readAsArray: vi.fn().mockName('FileReaderService.readAsArray')
    } as unknown as MockedObject<FileReaderService>;
    extensionValidatorSpy = {
      validate: vi.fn().mockName('ExtensionValidatorService.validate')
    } as unknown as MockedObject<ExtensionValidatorService>;
    cifValidatorSpy = {
      validator: vi.fn().mockName('CifFileValidatorService.validator')
    };
    pdbValidatorSpy = {
      validator: vi.fn().mockName('PdbFileValidatorService.validator')
    };
    bpseqValidatorSpy = {
      validator: vi.fn().mockName('BpseqFileValidatorService.validator')
    } as unknown as MockedObject<BpseqFileValidatorService>;
    ctValidatorSpy = {
      validator: vi.fn().mockName('CtFileValidatorService.validator')
    } as unknown as MockedObject<CtFileValidatorService>;
    dbnValidatorSpy = {
      validator: vi.fn().mockName('DbnFileValidatorService.validator')
    };

    fileReaderSpy.readAsArray.mockReturnValue(of([]));
    extensionValidatorSpy.validate.mockReturnValue(validPayload);
    cifValidatorSpy.validator.mockReturnValue(invalidPayload);
    pdbValidatorSpy.validator.mockReturnValue(invalidPayload);
    bpseqValidatorSpy.validator.mockReturnValue(invalidPayload);
    ctValidatorSpy.validator.mockReturnValue(invalidPayload);
    dbnValidatorSpy.validator.mockReturnValue(invalidPayload);

    TestBed.configureTestingModule({
      providers: [
        FileValidatorService,
        { provide: FileReaderService, useValue: fileReaderSpy },
        { provide: ExtensionValidatorService, useValue: extensionValidatorSpy },
        { provide: CifFileValidatorService, useValue: cifValidatorSpy },
        { provide: PdbFileValidatorService, useValue: pdbValidatorSpy },
        { provide: BpseqFileValidatorService, useValue: bpseqValidatorSpy },
        { provide: CtFileValidatorService, useValue: ctValidatorSpy },
        { provide: DbnFileValidatorService, useValue: dbnValidatorSpy },
      ],
    });

    service = TestBed.inject(FileValidatorService);
  });

  it('performs file extension validation', () => {
    const invalidExtensionPayload: ValidationPayload = {
      valid: false,
      message: 'extension validation failed',
    };

    const file = new File([], 'test.txt');
    extensionValidatorSpy.validate.mockReturnValue(invalidExtensionPayload);

    service.validate(file).subscribe(data => {
      expect(data).toBe(invalidExtensionPayload);
    });
  });

  it('uses cif validator for .cif files', () => {
    cifValidatorSpy.validator.mockReturnValue(validPayload);
    const file = new File([], 'file.cif');
    service.validate(file).subscribe(data => {
      expect(data).toBe(validPayload);
    });
  });

  it('uses pdb validator for .pdb files', () => {
    pdbValidatorSpy.validator.mockReturnValue(validPayload);
    const file = new File([], 'file.pdb');
    service.validate(file).subscribe(data => {
      expect(data).toBe(validPayload);
    });
  });

  it('uses bpseq validator for .bpseq files', () => {
    bpseqValidatorSpy.validator.mockReturnValue(validPayload);
    const file = new File([], 'file.bpseq');
    service.validate(file).subscribe(data => {
      expect(data).toBe(validPayload);
    });
  });

  it('uses ct validator for .ct files', () => {
    ctValidatorSpy.validator.mockReturnValue(validPayload);
    const file = new File([], 'file.ct');
    service.validate(file).subscribe(data => {
      expect(data).toBe(validPayload);
    });
  });

  it('uses dbn validator for .dbn files', () => {
    dbnValidatorSpy.validator.mockReturnValue(validPayload);
    const file = new File([], 'file.dbn');
    service.validate(file).subscribe(data => {
      expect(data).toBe(validPayload);
    });
  });
});
