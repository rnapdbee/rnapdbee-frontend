import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/secondary-to-dbn-params.module';
import { CalculationRequestService } from 'src/app/shared/services/calculation/calculation-request.service';
import { SecondaryToDbnService } from 'src/app/shared/services/calculation/secondary-to-dbn.service';
import { SecondaryPageComponent } from './secondary-page.component';

const mockUuid = 'mock-uuid-1234-5678';

const mockParams: SecondaryToDbnParams = {
  removeIsolated: true,
  structuralElementsHandling: 'USE_PSEUDOKNOTS',
  visualizationTool: 'VARNA',
};

const mockResponse: Calculation<SecondaryToDbnParams, SecondaryOutput> = {
  id: mockUuid,
  filename: '1EHZ.bpseq',
  results: [
    {
      params: mockParams,
      output: {
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
      },
    },
  ],
};


describe('SecondaryPageComponent', () => {
  let fixture: ComponentFixture<SecondaryPageComponent>;
  let component: SecondaryPageComponent;
  let calculationServiceSpy: jasmine.SpyObj<CalculationRequestService<SecondaryToDbnParams, SecondaryOutput>>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    calculationServiceSpy = jasmine.createSpyObj<CalculationRequestService<SecondaryToDbnParams, SecondaryOutput>>(
      'SecondaryToDbnService',
      ['find'],
    );

    await TestBed.configureTestingModule({
      declarations: [SecondaryPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: mockUuid }) } },
        { provide: SecondaryToDbnService, useValue: calculationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryPageComponent);
    component = fixture.componentInstance;
    ({ debugElement } = fixture);
    fixture.detectChanges();
  });

  it('shows loading component when calculation not resolved', () => {
    expect(debugElement.query(By.css('app-loading'))).toBeTruthy();
  });

  it('shows results component when id is valid', () => {
    component.calculationResults$ = of(mockResponse);
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-secondary-to-dbn-results'))).toBeTruthy();
  });

  it('shows error component when id is valid', () => {
    component.calculationResults$ = throwError(() => new Error(''));
    component.error = 'error';
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-error'))).toBeTruthy();
  });
});
