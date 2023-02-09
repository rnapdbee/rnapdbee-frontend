import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { MultiOutput } from 'src/app/shared/models/output/multi-output.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/params/tertiary-to-multi-params.model';
import { CalculationRequestService } from 'src/app/shared/services/calculation/calculation-request.service';
import { TertiaryToMultiService } from 'src/app/shared/services/calculation/tertiary-to-multi.service';
import { MultiPageComponent } from './multi-page.component';

const filename = '1EHZ.cif';
const mockUuid = 'mock-uuid-1234-5678';

const mockParams: TertiaryToMultiParams = {
  includeNonCanonical: true,
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

const mockOutput: MultiOutput = {
  title: '',
  consensualVisualization: {
    pathToSVGImage: '',
  },
  entries: [
    {
      output2D: mock2DOutput,
      adapterEnums: ['MC_ANNOTATE, RNAPOLIS'],
    },
  ],
};

const mockResponse: Calculation<TertiaryToMultiParams, MultiOutput> = {
  id: mockUuid,
  filename,
  results: [
    {
      params: mockParams,
      output: mockOutput,
    },
  ],
};

describe('MultiPageComponent', () => {
  let fixture: ComponentFixture<MultiPageComponent>;
  let component: MultiPageComponent;
  let calculationServiceSpy: jasmine.SpyObj<CalculationRequestService<TertiaryToMultiParams, MultiOutput>>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    calculationServiceSpy = jasmine.createSpyObj<CalculationRequestService<TertiaryToMultiParams, MultiOutput>>(
      'TertiaryToMultiService',
      { find: of(mockResponse) },
      { calculationResults$: of(mockResponse) },
    );

    await TestBed.configureTestingModule({
      declarations: [MultiPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: mockUuid }) } },
        { provide: TertiaryToMultiService, useValue: calculationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiPageComponent);
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
    expect(debugElement.query(By.css('app-tertiary-to-multi-results'))).toBeTruthy();
  });

  it('shows error component when id is valid', () => {
    component.calculationResults$ = throwError(() => new Error(''));
    component.error = 'error';
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-error'))).toBeTruthy();
  });
});
