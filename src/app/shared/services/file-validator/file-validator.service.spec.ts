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
  let fileReaderSpy: jasmine.SpyObj<FileReaderService>;
  let extensionValidatorSpy: jasmine.SpyObj<ExtensionValidatorService>;
  let cifValidatorSpy: jasmine.SpyObj<CifFileValidatorService>;
  let pdbValidatorSpy: jasmine.SpyObj<PdbFileValidatorService>;
  let bpseqValidatorSpy: jasmine.SpyObj<BpseqFileValidatorService>;
  let ctValidatorSpy: jasmine.SpyObj<CtFileValidatorService>;
  let dbnValidatorSpy: jasmine.SpyObj<DbnFileValidatorService>;

  const validPayload: ValidationPayload = {
    valid: true,
    message: '',
  };

  const invalidPayload: ValidationPayload = {
    valid: false,
    message: '',
  };

  beforeEach(() => {
    fileReaderSpy = jasmine.createSpyObj<FileReaderService>('FileReaderService', ['readAsArray']);
    extensionValidatorSpy = jasmine.createSpyObj<ExtensionValidatorService>('ExtensionValidatorService', ['validate']);
    cifValidatorSpy = jasmine.createSpyObj<CifFileValidatorService>('CifFileValidatorService', ['validator']);
    pdbValidatorSpy = jasmine.createSpyObj<PdbFileValidatorService>('PdbFileValidatorService', ['validator']);
    bpseqValidatorSpy = jasmine.createSpyObj<BpseqFileValidatorService>('BpseqFileValidatorService', ['validator']);
    ctValidatorSpy = jasmine.createSpyObj<CtFileValidatorService>('CtFileValidatorService', ['validator']);
    dbnValidatorSpy = jasmine.createSpyObj<DbnFileValidatorService>('DbnFileValidatorService', ['validator']);

    fileReaderSpy.readAsArray.and.returnValue(of([]));
    extensionValidatorSpy.validate.and.returnValue(validPayload);
    cifValidatorSpy.validator.and.returnValue(invalidPayload);
    pdbValidatorSpy.validator.and.returnValue(invalidPayload);
    bpseqValidatorSpy.validator.and.returnValue(invalidPayload);
    ctValidatorSpy.validator.and.returnValue(invalidPayload);
    dbnValidatorSpy.validator.and.returnValue(invalidPayload);

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

  it('performs file extension validation', (done: DoneFn) => {
    const invalidExtensionPayload: ValidationPayload = {
      valid: false,
      message: 'extension validation failed',
    };

    const file = new File([], 'test.txt');
    extensionValidatorSpy.validate.and.returnValue(invalidExtensionPayload);

    service.validate(file).subscribe(data => {
      expect(data).toBe(invalidExtensionPayload);
      done();
    });
  });

  it('uses cif validator for .cif files', (done: DoneFn) => {
    cifValidatorSpy.validator.and.returnValue(validPayload);
    const file = new File([], 'file.cif');
    service.validate(file).subscribe(data => {
      expect(data).toBe(validPayload);
      done();
    });
  });

  it('uses pdb validator for .pdb files', (done: DoneFn) => {
    pdbValidatorSpy.validator.and.returnValue(validPayload);
    const file = new File([], 'file.pdb');
    service.validate(file).subscribe(data => {
      expect(data).toBe(validPayload);
      done();
    });
  });

  it('uses bpseq validator for .bpseq files', (done: DoneFn) => {
    bpseqValidatorSpy.validator.and.returnValue(validPayload);
    const file = new File([], 'file.bpseq');
    service.validate(file).subscribe(data => {
      expect(data).toBe(validPayload);
      done();
    });
  });

  it('uses ct validator for .ct files', (done: DoneFn) => {
    ctValidatorSpy.validator.and.returnValue(validPayload);
    const file = new File([], 'file.ct');
    service.validate(file).subscribe(data => {
      expect(data).toBe(validPayload);
      done();
    });
  });

  it('uses dbn validator for .dbn files', (done: DoneFn) => {
    dbnValidatorSpy.validator.and.returnValue(validPayload);
    const file = new File([], 'file.dbn');
    service.validate(file).subscribe(data => {
      expect(data).toBe(validPayload);
      done();
    });
  });
});
