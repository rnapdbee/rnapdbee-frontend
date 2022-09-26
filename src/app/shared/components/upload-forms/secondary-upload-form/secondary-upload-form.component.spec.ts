/* eslint-disable @typescript-eslint/unbound-method */
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import {
  SECONDARY_TO_DBN_BPSEQ_EXAMPLES,
  SECONDARY_TO_DBN_CT_EXAMPLES,
  SECONDARY_TO_DBN_DBN_EXAMPLES,
} from 'src/app/shared/constants/secondary-to-dbn-examples.const';
import { Example } from 'src/app/shared/models/example.model';
import { UploadMethodType } from 'src/app/shared/models/upload-type.model';
import { ValidationPayload } from 'src/app/shared/models/validation-payload.model';
import { FileValidatorService } from 'src/app/shared/services/file-validator/file-validator.service';
import { SecondaryUploadFormComponent } from './secondary-upload-form.component';

describe('SecondaryUploadFormComponent', () => {
  let fixture: ComponentFixture<SecondaryUploadFormComponent>;
  let component: SecondaryUploadFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryUploadFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('emits invalid empty payload on init', () => {
    spyOn(component.uploadChange, 'emit');
    component.ngOnInit();
    expect(component.uploadChange.emit).toHaveBeenCalledOnceWith(jasmine.objectContaining({
      data: null,
      valid: false,
    }));
  });

  describe('UploadMethod change', () => {
    beforeEach(() => {
      spyOn(component.uploadChange, 'emit');
    });

    it('emits object of type file when set to file', () => {
      component.currentUploadType = UploadMethodType.fromLocalFile;
      component.onMethodChange();
      expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        type: UploadMethodType.fromLocalFile,
      }));
    });

    it('emits object of type example when set to example', () => {
      component.currentUploadType = UploadMethodType.fromExample;
      component.onMethodChange();
      expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        type: UploadMethodType.fromExample,
      }));
    });
  });

  describe('File upload method', () => {
    let mockFileValidatorService: FileValidatorService;
    let mockFile: File;
    let validMockValidationPayload: ValidationPayload;
    let invalidMockValidationPayload: ValidationPayload;

    beforeEach(() => {
      component.currentUploadType = UploadMethodType.fromLocalFile;
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

      spyOn(component.uploadChange, 'emit');
    });

    it('emits invalid payload when file not provided', () => {
      component.file = null;
      component.onMethodChange();
      expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        valid: false,
      }));
    });

    it('emits invalid payload when file provided and validation fails', () => {
      spyOn(mockFileValidatorService, 'validate').and.returnValue(of(invalidMockValidationPayload));

      component.setAndValidateFile(mockFile);
      expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        valid: false,
      }));
    });

    it('emits valid payload when file provided and validation passes', () => {
      spyOn(mockFileValidatorService, 'validate').and.returnValue(of(validMockValidationPayload));

      component.setAndValidateFile(mockFile);
      expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
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
      spyOn(mockFileValidatorService, 'validate').and.returnValue(of(validMockValidationPayload));

      component.setAndValidateFile(mockFile);
      expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        data: mockFile,
      }));
    });
  });

  describe('Example upload method', () => {
    beforeEach(() => {
      component.currentUploadType = UploadMethodType.fromExample;
    });

    it('renders example picker', () => {
      const { debugElement } = fixture;
      const picker = debugElement.query(By.css('app-example-picker'));
      expect(picker).toBeTruthy();
    });

    it('emits new payload when example type changed', () => {
      spyOn(component.uploadChange, 'emit');
      component.onExampleTypeChange('bpseq');
      component.onExampleTypeChange('ct');
      expect(component.uploadChange.emit).toHaveBeenCalledTimes(2);
    });

    describe('Bpseq example type', () => {
      let mockExample: Example;

      beforeEach(() => {
        component.onExampleTypeChange('bpseq');
        mockExample = SECONDARY_TO_DBN_BPSEQ_EXAMPLES[0];
        spyOn(component.uploadChange, 'emit');
      });

      it('emits invalid payload when bpseq example not provided', () => {
        component.bpseqExample = null;
        component.onMethodChange();
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          valid: false,
        }));
      });

      it('emits valid payload when bpseq example provided', () => {
        component.onBpseqExampleSelect(mockExample);
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          valid: true,
        }));
      });

      it('emits new value when example changed', () => {
        const mockedExample2 = SECONDARY_TO_DBN_BPSEQ_EXAMPLES[1];
        component.onBpseqExampleSelect(mockExample);
        component.onBpseqExampleSelect(mockedExample2);
        expect(component.uploadChange.emit).toHaveBeenCalledTimes(2);
      });

      it('includes example object in payload', () => {
        component.onBpseqExampleSelect(mockExample);
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          data: mockExample,
        }));
      });

      it('emits bpseq example', () => {
        const dummyExample = { name: '', no: -1, path: '' };
        component.bpseqExample = mockExample;
        component.ctExample = dummyExample;
        component.dbnExample = dummyExample;
        component.onMethodChange();
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          data: component.bpseqExample,
        }));
      });
    });

    describe('Ct example type', () => {
      let mockExample: Example;

      beforeEach(() => {
        component.onExampleTypeChange('ct');
        mockExample = SECONDARY_TO_DBN_CT_EXAMPLES[0];
        spyOn(component.uploadChange, 'emit');
      });

      it('emits invalid payload when ct example not provided', () => {
        component.ctExample = null;
        component.onMethodChange();
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          valid: false,
        }));
      });

      it('emits valid payload when ct example provided', () => {
        component.onCtExampleSelect(mockExample);
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          valid: true,
        }));
      });

      it('emits new value when example changed', () => {
        const mockedExample2 = SECONDARY_TO_DBN_CT_EXAMPLES[1];
        component.onCtExampleSelect(mockExample);
        component.onCtExampleSelect(mockedExample2);
        expect(component.uploadChange.emit).toHaveBeenCalledTimes(2);
      });

      it('includes example object in payload', () => {
        component.onCtExampleSelect(mockExample);
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          data: mockExample,
        }));
      });

      it('emits ct example', () => {
        const dummyExample = { name: '', no: -1, path: '' };
        component.ctExample = mockExample;
        component.bpseqExample = dummyExample;
        component.dbnExample = dummyExample;
        component.onMethodChange();
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          data: component.ctExample,
        }));
      });
    });

    describe('Dbn example type', () => {
      let mockExample: Example;

      beforeEach(() => {
        component.onExampleTypeChange('dbn');
        mockExample = SECONDARY_TO_DBN_DBN_EXAMPLES[0];
        spyOn(component.uploadChange, 'emit');
      });

      it('emits invalid payload when dbn example not provided', () => {
        component.dbnExample = null;
        component.onMethodChange();
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          valid: false,
        }));
      });

      it('emits valid payload when dbn example provided', () => {
        component.onDbnExampleSelect(mockExample);
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          valid: true,
        }));
      });

      it('emits new value when example changed', () => {
        const mockedExample2 = SECONDARY_TO_DBN_DBN_EXAMPLES[1];
        component.onDbnExampleSelect(mockExample);
        component.onDbnExampleSelect(mockedExample2);
        expect(component.uploadChange.emit).toHaveBeenCalledTimes(2);
      });

      it('includes example object in payload', () => {
        component.onDbnExampleSelect(mockExample);
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          data: mockExample,
        }));
      });

      it('emits dbn example', () => {
        const dummyExample = { name: '', no: -1, path: '' };
        component.dbnExample = mockExample;
        component.bpseqExample = dummyExample;
        component.ctExample = dummyExample;
        component.onMethodChange();
        expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
          data: component.dbnExample,
        }));
      });
    });
  });
});
