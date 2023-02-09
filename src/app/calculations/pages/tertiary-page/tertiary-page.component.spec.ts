import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { Residue, TertiaryInteractions, TertiaryOutput } from 'src/app/shared/models/output/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/params/tertiary-to-dbn-params.model';
import { CalculationRequestService } from 'src/app/shared/services/calculation/calculation-request.service';
import { TertiaryToDbnService } from 'src/app/shared/services/calculation/tertiary-to-dbn.service';
import { TertiaryPageComponent } from './tertiary-page.component';

const filename = '1EHZ.cif';
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
  insertionCode: 'a',
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


describe('TertiaryPageComponent', () => {
  let fixture: ComponentFixture<TertiaryPageComponent>;
  let component: TertiaryPageComponent;
  let calculationServiceSpy: jasmine.SpyObj<CalculationRequestService<TertiaryToDbnParams, TertiaryOutput>>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    calculationServiceSpy = jasmine.createSpyObj<CalculationRequestService<TertiaryToDbnParams, TertiaryOutput>>(
      'TertiaryToDbnService',
      { find: of(mockResponse) },
      { calculationResults$: of(mockResponse) },
    );

    await TestBed.configureTestingModule({
      declarations: [TertiaryPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: mockUuid }) } },
        { provide: TertiaryToDbnService, useValue: calculationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TertiaryPageComponent);
    component = fixture.componentInstance;
    ({ debugElement } = fixture);
    fixture.detectChanges();
  });

  it('shows loading component when calculation not resolved', () => {
    component.calculationResults$ = of(null);
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-calculation-loading'))).toBeTruthy();
  });

  it('shows results component when id is valid', () => {
    component.calculationResults$ = of(mockResponse);
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-tertiary-to-dbn-results'))).toBeTruthy();
  });

  it('shows error component when id is valid', () => {
    component.calculationResults$ = throwError(() => new Error(''));
    component.error = 'error';
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-error'))).toBeTruthy();
  });
});
