import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ApiPaths } from 'src/environments/environment';
import { Calculation } from '../../models/calculation/calculation.model';
import { DrawingResult, SecondaryOutput } from '../../models/output/secondary-output.model';
import { Residue, TertiaryInteractions, TertiaryOutput } from '../../models/output/tertiary-output.model';
import { TertiaryToDbnParams } from '../../models/params/tertiary-to-dbn-params.model';
import { Example } from '../../models/upload/example.model';
import { UploadMethod, UploadMethodType } from '../../models/upload/upload-type.model';
import { FileReaderService } from '../file-validator/file-reader.service';
import { TertiaryToDbnService } from './tertiary-to-dbn.service';

const filename = '1EHZ.cif';
const fileContent = 'this is valid file content';
const mockUuid = 'mock-uuid-1234-5678';

const mockParams: TertiaryToDbnParams = {
  modelSelection: 'FIRST',
  analysisTool: 'FR3D_PYTHON',
  nonCanonicalHandling: 'VISUALIZATION_ONLY',
  removeIsolated: true,
  structuralElementsHandling: 'USE_PSEUDOKNOTS',
  visualizationTool: 'VARNA',
};

const mock2DOutput: SecondaryOutput = {
  strands: [{ name: '', sequence: '', structure: '' }],
  bpSeq: [''],
  ct: [''],
  interactions: [''],
  structuralElements: {
    stems: [''],
    loops: [''],
    singleStrands: [''],
    singleStrands5p: [''],
    singleStrands3p: [''],
  },
  imageInformation: {
    pathToSVGImage: '',
    successfulVisualizationTool: '',
    failedVisualizationTool: '',
    drawingResult: DrawingResult.DoneByMainDrawer,
  },
};

const mockResidue: Residue = {
  chainIdentifier: '',
  residueNumber: 0,
  insertionCode: null,
  oneLetterName: '',
};

const mockInteractions: TertiaryInteractions[] = [
  {
    interactionType: '',
    saenger: '',
    leontisWesthof: '',
    bPh: 0,
    br: 0,
    leftResidue: mockResidue,
    rightResidue: mockResidue,
    stackingTopology: '',
  },
];

const mockResponse: Calculation<TertiaryToDbnParams, TertiaryOutput> = {
  id: mockUuid,
  filename,
  results: [
    {
      params: mockParams,
      output: {
        models: [
          {
            modelNumber: 1,
            output2D: mock2DOutput,
            messages: [],
            canonicalInteractions: mockInteractions,
            nonCanonicalInteractions: mockInteractions,
            interStrandInteractions: mockInteractions,
            stackingInteractions: mockInteractions,
            basePhosphateInteractions: mockInteractions,
            baseRiboseInteractions: mockInteractions,
          },
        ],
      },
    },
  ],
};

const httpParams = new HttpParams({ fromObject: mockParams });

describe('TertiaryToDbnService', () => {
  let service: TertiaryToDbnService;
  let controller: HttpTestingController;
  let fileReaderSpy: jasmine.SpyObj<FileReaderService>;
  let response: Calculation<TertiaryToDbnParams, TertiaryOutput> | undefined;
  let error: string | undefined;

  beforeEach(() => {
    fileReaderSpy = jasmine.createSpyObj<FileReaderService>('FileReaderService', {
      readAsTextFromFile: of(fileContent),
      readAsTextFromPath: of(fileContent),
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TertiaryToDbnService,
        { provide: FileReaderService, useValue: fileReaderSpy },
      ],
    });
    service = TestBed.inject(TertiaryToDbnService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('constructs url for tertiary calculations', () => {
    const tertiaryPath = ApiPaths.Tertiary;
    expect(service.url).toMatch(tertiaryPath);
  });

  describe('Calculation from pdbId', () => {
    let mockPdbId: string;
    let requestUrl: string;
    let mockContent: UploadMethod;

    beforeEach(() => {
      mockPdbId = 'XXXX';
      requestUrl = `${service.url}/pdb/${mockPdbId}`;
      mockContent = {
        type: UploadMethodType.FromPDB,
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
        type: UploadMethodType.FromLocalFile,
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
        type: UploadMethodType.FromExample,
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
      requestUrl = `${service.url}/${mockUuid}`;
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

  describe('Reanalyze with different parameters', () => {
    let requestUrl: string;

    beforeEach(() => {
      requestUrl = `${service.url}/${mockUuid}`;
    });

    it('sends valid request', () => {
      service.reanalyze(mockUuid, mockParams).subscribe(data => {
        response = data;
      });

      const req = controller.expectOne(`${requestUrl}?${httpParams.toString()}`);
      req.flush(mockResponse);

      expect(response?.id).toEqual(mockUuid);
      expect(response).toEqual(mockResponse);
      expect(req.request.url).toEqual(requestUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(null);
      expect(req.request.params).toEqual(httpParams);
    });
  });
});
