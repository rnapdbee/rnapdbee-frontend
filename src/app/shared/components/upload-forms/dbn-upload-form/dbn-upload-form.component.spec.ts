/* eslint-disable @typescript-eslint/unbound-method */
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DBN_TO_IMAGE_EXAMPLES } from 'src/app/shared/constants/dbn-to-image-examples.const';
import { Example } from 'src/app/shared/models/example.model';
import { UploadMethodType } from 'src/app/shared/models/upload-type.model';
import { ValidationPayload } from 'src/app/shared/models/validation-payload.model';
import { FileValidatorService } from 'src/app/shared/services/file-validator/file-validator.service';
import { DbnUploadFormComponent } from './dbn-upload-form.component';


describe('DbnUploadFormComponent', () => {
  let fixture: ComponentFixture<DbnUploadFormComponent>;
  let component: DbnUploadFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DbnUploadFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DbnUploadFormComponent);
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

  it('not emits when uploadMethod is out of scope', () => {
    spyOn(component.uploadChange, 'emit');
    component.currentUploadType = UploadMethodType.fromPDB;
    component.onMethodChange();
    expect(component.uploadChange.emit).toHaveBeenCalledTimes(0);
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
    let mockExample: Example;

    beforeEach(() => {
      component.currentUploadType = UploadMethodType.fromExample;
      mockExample = DBN_TO_IMAGE_EXAMPLES[0];
      spyOn(component.uploadChange, 'emit');
    });

    it('renders example picker', () => {
      const { debugElement } = fixture;
      const picker = debugElement.query(By.css('app-example-picker'));
      expect(picker).toBeTruthy();
    });

    it('emits invalid payload when example not provided', () => {
      component.example = null;
      component.onMethodChange();
      expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        valid: false,
      }));
    });

    it('emits valid payload when example provided', () => {
      component.onExampleSelect(mockExample);
      expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        valid: true,
      }));
    });

    it('emits new value when example changed', () => {
      const mockedExample2 = DBN_TO_IMAGE_EXAMPLES[1];
      component.onExampleSelect(mockExample);
      component.onExampleSelect(mockedExample2);
      expect(component.uploadChange.emit).toHaveBeenCalledTimes(2);
    });

    it('includes example object in payload', () => {
      component.onExampleSelect(mockExample);
      expect(component.uploadChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        data: mockExample,
      }));
    });
  });
});
