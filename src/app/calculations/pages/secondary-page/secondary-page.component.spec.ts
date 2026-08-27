import { beforeEach, describe, expect, it, type MockedObject, vi } from 'vitest';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/params/secondary-to-dbn-params.model';
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
  let calculationServiceSpy: MockedObject<CalculationRequestService<SecondaryToDbnParams, SecondaryOutput>>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    calculationServiceSpy = {
      find: vi.fn().mockName('SecondaryToDbnService.find').mockReturnValue(of(mockResponse)),
      calculationResults$: of(mockResponse)
    } as unknown as MockedObject<CalculationRequestService<SecondaryToDbnParams, SecondaryOutput>>;

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
  });

  it('shows loading component when calculation not resolved', async () => {
    component.calculationResults$ = of(null);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-calculation-loading'))).toBeTruthy();
  });

  it('shows results component when id is valid', async () => {
    component.calculationResults$ = of(mockResponse);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-secondary-to-dbn-results'))).toBeTruthy();
  });

  it('shows error component when id is valid', async () => {
    component.calculationResults$ = of(null);
    component.error = 'error';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-error'))).toBeTruthy();
  });
});
