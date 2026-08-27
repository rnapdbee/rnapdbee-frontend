import { beforeEach, describe, expect, it, vi } from 'vitest';
/* eslint-disable @typescript-eslint/unbound-method */
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TERTIARY_TO_DBN_EXAMPLES } from 'src/app/shared/constants/tertiary-to-dbn-examples.const';
import { Example } from 'src/app/shared/models/upload/example.model';
import { UploadMethodType } from 'src/app/shared/models/upload/upload-type.model';
import { ValidationPayload } from 'src/app/shared/models/upload/validation-payload.model';
import { FileValidatorService } from 'src/app/shared/services/file-validator/file-validator.service';
import { TertiaryUploadFormComponent } from './tertiary-upload-form.component';

describe('TertiaryUploadFormComponent', () => {
  let fixture: ComponentFixture<TertiaryUploadFormComponent>;
  let component: TertiaryUploadFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TertiaryUploadFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [],
      providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())],
    }).compileComponents();

    fixture = TestBed.createComponent(TertiaryUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('emits invalid empty payload on init', () => {
    vi.spyOn(component.uploadChange, 'emit').mockReturnValue(undefined);
    component.ngOnInit();
    expect(component.uploadChange.emit).toHaveBeenCalledTimes(1);
    expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
      data: '',
      valid: false,
    }));
  });

  describe('UploadMethod change', () => {
    beforeEach(() => {
      vi.spyOn(component.uploadChange, 'emit').mockReturnValue(undefined);
    });

    it('emits object of type pdb when set to pdb', () => {
      component.currentUploadType = UploadMethodType.FromPDB;
      component.onMethodChange();
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        type: UploadMethodType.FromPDB,
      }));
    });

    it('emits object of type file when set to file', () => {
      component.currentUploadType = UploadMethodType.FromLocalFile;
      component.onMethodChange();
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        type: UploadMethodType.FromLocalFile,
      }));
    });

    it('emits object of type example when set to example', () => {
      component.currentUploadType = UploadMethodType.FromExample;
      component.onMethodChange();
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        type: UploadMethodType.FromExample,
      }));
    });
  });

  describe('PdbId upload method', () => {
    let mockPdbId: string;

    beforeEach(() => {
      component.currentUploadType = UploadMethodType.FromPDB;
      mockPdbId = '4R30';
      vi.spyOn(component.uploadChange, 'emit').mockReturnValue(undefined);
    });

    it('emits invalid payload when pdbId not provided', () => {
      component.pdbId = '';
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        valid: false,
      }));
    });

    const invalidIds = ['aa2', 'AB48E', 'A_C4', '#123', ' a b c d ', ''];
    invalidIds.forEach(id => {
      it(`emits invalid payload when pdbId provided and validation fails (${id})`, () => {
        component.pdbId = id;
        expect(component.uploadChange.emit).toHaveBeenCalledTimes(1);
        expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
          valid: false,
        }));
      });
    });

    it('emits valid payload when pdbId provided and validation passes', () => {
      component.pdbId = 'a1b2';
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        valid: true,
      }));
    });

    it('emits new value when file changed', () => {
      const mockPdbId2 = 'a1b2';
      component.pdbId = mockPdbId;
      component.pdbId = mockPdbId2;
      expect(component.uploadChange.emit).toHaveBeenCalledTimes(2);
    });

    it('includes pdbId in payload', () => {
      component.pdbId = mockPdbId;
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        data: mockPdbId,
      }));
    });
  });

  describe('File upload method', () => {
    let mockFileValidatorService: FileValidatorService;
    let mockFile: File;
    let validMockValidationPayload: ValidationPayload;
    let invalidMockValidationPayload: ValidationPayload;

    beforeEach(() => {
      component.currentUploadType = UploadMethodType.FromLocalFile;
      mockFileValidatorService = TestBed.inject(FileValidatorService);
      mockFile = new File([], 'mocked file');
      validMockValidationPayload = {
        valid: true,
        message: 'validation passes',
      };
      invalidMockValidationPayload = {
        valid: false,
        message: 'validation failed',
      };

      vi.spyOn(component.uploadChange, 'emit').mockReturnValue(undefined);
    });

    it('emits invalid payload when file not provided', () => {
      component.file = null;
      component.onMethodChange();
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        valid: false,
      }));
    });

    it('emits invalid payload when file provided and validation fails', () => {
      vi.spyOn(mockFileValidatorService, 'validate').mockReturnValue(of(invalidMockValidationPayload));

      component.setAndValidateFile(mockFile);
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        valid: false,
      }));
    });

    it('emits valid payload when file provided and validation passes', () => {
      vi.spyOn(mockFileValidatorService, 'validate').mockReturnValue(of(validMockValidationPayload));

      component.setAndValidateFile(mockFile);
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        valid: true,
      }));
    });

    it('emits new value when file changed', () => {
      const mockFile2 = new File([], 'mocked file 2');
      component.setAndValidateFile(mockFile);
      component.setAndValidateFile(mockFile2);
      expect(component.uploadChange.emit).toHaveBeenCalledTimes(2);
    });

    it('includes valid file object in payload', () => {
      vi.spyOn(mockFileValidatorService, 'validate').mockReturnValue(of(validMockValidationPayload));

      component.setAndValidateFile(mockFile);
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        data: mockFile,
      }));
    });
  });

  describe('Example upload method', () => {
    let mockExample: Example;

    beforeEach(() => {
      component.currentUploadType = UploadMethodType.FromExample;
      mockExample = TERTIARY_TO_DBN_EXAMPLES[0];
      vi.spyOn(component.uploadChange, 'emit').mockReturnValue(undefined);
    });

    it('renders example picker', () => {
      const { debugElement } = fixture;
      const picker = debugElement.query(By.css('app-example-picker'));
      expect(picker).toBeTruthy();
    });

    it('emits invalid payload when example not provided', () => {
      component.example = null;
      component.onMethodChange();
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        valid: false,
      }));
    });

    it('emits valid payload when example provided', () => {
      component.onExampleSelect(mockExample);
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        valid: true,
      }));
    });

    it('emits new value when example changed', () => {
      const mockedExample2 = TERTIARY_TO_DBN_EXAMPLES[1];
      component.onExampleSelect(mockExample);
      component.onExampleSelect(mockedExample2);
      expect(component.uploadChange.emit).toHaveBeenCalledTimes(2);
    });

    it('includes example object in payload', () => {
      component.onExampleSelect(mockExample);
      expect(component.uploadChange.emit).toHaveBeenCalledWith(expect.objectContaining({
        data: mockExample,
      }));
    });
  });
});
