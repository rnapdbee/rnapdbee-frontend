import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ApiPaths } from 'src/environments/environment';
import { Calculation } from '../../models/calculation.model';
import { Example } from '../../models/example.model';
import { SecondaryOutput } from '../../models/secondary-output.model';
import { SecondaryToDbnParams } from '../../models/secondary-to-dbn-params.module';
import { UploadMethod, UploadMethodType } from '../../models/upload-type.model';
import { FileReaderService } from '../file-validator/file-reader.service';
import { SecondaryToDbnService } from './secondary-to-dbn.service';

const filename = '1EHZ.bpseq';
const fileContent = 'this is valid file content';
const mockUuid = 'mock-uuid-1234-5678';

const mockParams: SecondaryToDbnParams = {
  removeIsolated: true,
  structuralElementsHandling: 'USE_PSEUDOKNOTS',
  visualizationTool: 'VARNA',
};

const mockResponse: Calculation<SecondaryToDbnParams, SecondaryOutput> = {
  id: mockUuid,
  filename,
  results: [
    {
      params: mockParams,
      output: {
        out: 'output',
      },
    },
  ],
};

const httpParams = new HttpParams({ fromObject: mockParams });

describe('SecondaryToDbnService', () => {
  let service: SecondaryToDbnService;
  let controller: HttpTestingController;
  let fileReaderSpy: jasmine.SpyObj<FileReaderService>;
  let response: Calculation<SecondaryToDbnParams, SecondaryOutput> | undefined;
  let error: string | undefined;

  beforeEach(() => {
    fileReaderSpy = jasmine.createSpyObj<FileReaderService>('FileReaderService', {
      readAsTextFromFile: of(fileContent),
      readAsTextFromPath: of(fileContent),
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SecondaryToDbnService,
        { provide: FileReaderService, useValue: fileReaderSpy },
      ],
    });
    service = TestBed.inject(SecondaryToDbnService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('constructs url for secondary calculations', () => {
    const secondaryPath = ApiPaths.Secondary;
    expect(service.url).toMatch(secondaryPath);
  });

  describe('Calculation from File', () => {
    let mockFile: File;
    let requestUrl: string;
    let mockContent: UploadMethod;

    beforeEach(() => {
      mockFile = new File([fileContent], filename);
      requestUrl = `${service.url}`;
      mockContent = {
        type: UploadMethodType.fromLocalFile,
        data: mockFile,
        valid: true,
      };
    });

    it('sends valid request', () => {
      service.calculate(mockParams, mockContent).subscribe(data => {
        response = data;
      });

      const req = controller.expectOne(`${requestUrl}?${httpParams.toString()}`);
      req.flush(mockResponse);

      expect(response).toEqual(mockResponse);
      expect(req.request.url).toEqual(requestUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(fileContent);
      expect(req.request.params).toEqual(httpParams);
      expect(req.request.headers.get('Content-Disposition')).toEqual(`attachment; filename="${filename}"`);
    });

    it('returns error when file could not be processed', () => {
      const errMsg = 'File could not be read';
      fileReaderSpy.readAsTextFromFile.and.returnValue(throwError(() => errMsg));

      service.calculate(mockParams, mockContent).subscribe({
        error: (data: string) => {
          error = data;
        },
      });

      controller.expectNone(requestUrl);
      expect(error).toEqual(errMsg);
    });
  });

  describe('Calculation from Example', () => {
    let mockExample: Example;
    let requestUrl: string;
    let mockContent: UploadMethod;

    beforeEach(() => {
      mockExample = {
        no: 1,
        name: filename,
        path: 'path/to/example',
      };
      requestUrl = `${service.url}`;
      mockContent = {
        type: UploadMethodType.fromExample,
        data: mockExample,
        valid: true,
      };
    });

    it('sends valid request', () => {
      service.calculate(mockParams, mockContent).subscribe(data => {
        response = data;
      });

      const req = controller.expectOne(`${requestUrl}?${httpParams.toString()}`);
      req.flush(mockResponse);

      expect(response).toEqual(mockResponse);
      expect(req.request.url).toEqual(requestUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(fileContent);
      expect(req.request.params).toEqual(httpParams);
      expect(req.request.headers.get('Content-Disposition')).toEqual(`attachment; filename="${filename}"`);
    });

    it('returns error when example could not be processed', () => {
      const errMsg = 'Example could not be found';
      fileReaderSpy.readAsTextFromPath.and.returnValue(throwError(() => errMsg));

      service.calculate(mockParams, mockContent).subscribe({
        error: (data: string) => {
          error = data;
        },
      });

      controller.expectNone(requestUrl);
      expect(error).toEqual(errMsg);
    });
  });

  describe('Find by ID', () => {
    let requestUrl: string;

    beforeEach(() => {
      requestUrl = `${service.url}${mockUuid}`;
    });

    it('sends valid request', () => {
      service.find(mockUuid).subscribe(data => {
        response = data;
      });

      const req = controller.expectOne(requestUrl);
      req.flush(mockResponse);

      expect(response?.id).toEqual(mockUuid);
      expect(response).toEqual(mockResponse);
      expect(req.request.url).toEqual(requestUrl);
      expect(req.request.method).toEqual('GET');
      expect(req.request.body).toEqual(null);
    });
  });

  // TODO: describe('Reanalyze with different parameters', () => {});
});
