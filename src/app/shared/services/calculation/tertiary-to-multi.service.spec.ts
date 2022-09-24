import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ApiPaths } from 'src/environments/environment';
import { Calculation } from '../../models/calculation.model';
import { Example } from '../../models/example.model';
import { MultiOutput } from '../../models/multi-output.model';
import { TertiaryToMultiParams } from '../../models/tertiary-to-multi-params.model';
import { UploadMethod, UploadMethodType } from '../../models/upload-type.model';
import { FileReaderService } from '../file-validator/file-reader.service';
import { TertiaryToMultiService } from './tertiary-to-multi.service';

const filename = '1EHZ.cif';
const fileContent = 'this is valid file content';
const mockUuid = 'mock-uuid-1234-5678';

const mockParams: TertiaryToMultiParams = {
  modelSelection: 'FIRST',
  includeNonCanonical: false,
  removeIsolated: true,
  visualizationTool: 'VARNA',
};

const mockResponse: Calculation<TertiaryToMultiParams, MultiOutput> = {
  id: mockUuid,
  results: [
    {
      meta: {
        filename,
        params: mockParams,
      },
      output: {
        out: 'output',
      },
    },
  ],
};

const httpParams = new HttpParams({ fromObject: mockParams });

describe('TertiaryToMultiService', () => {
  let service: TertiaryToMultiService;
  let controller: HttpTestingController;
  let fileReaderSpy: jasmine.SpyObj<FileReaderService>;
  let response: Calculation<TertiaryToMultiParams, MultiOutput> | undefined;
  let error: string | undefined;

  beforeEach(() => {
    fileReaderSpy = jasmine.createSpyObj<FileReaderService>('FileReaderService', {
      readAsTextFromFile: of(fileContent),
      readAsTextFromPath: of(fileContent),
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TertiaryToMultiService,
        { provide: FileReaderService, useValue: fileReaderSpy },
      ],
    });
    service = TestBed.inject(TertiaryToMultiService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('constructs url for multi calculations', () => {
    const multiPath = ApiPaths.Multi;
    expect(service.url).toMatch(multiPath);
  });

  describe('Calculation from pdbId', () => {
    let mockPdbId: string;
    let requestUrl: string;
    let mockContent: UploadMethod;

    beforeEach(() => {
      mockPdbId = 'XXXX';
      requestUrl = `${service.url}pdb/${mockPdbId}`;
      mockContent = {
        type: UploadMethodType.fromPDB,
        data: mockPdbId,
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
      expect(req.request.body).toEqual(null);
      expect(req.request.params).toEqual(httpParams);
    });
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
