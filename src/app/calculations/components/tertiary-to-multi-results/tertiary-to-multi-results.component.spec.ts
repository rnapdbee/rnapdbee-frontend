import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { MultiOutput } from 'src/app/shared/models/output/multi-output.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/params/tertiary-to-multi-params.model';
import { MultiSelect } from 'src/app/shared/models/select/multi-select.model';
import { TertiaryToMultiResultsComponent } from './tertiary-to-multi-results.component';

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
    {
      params: mockParams,
      output: mockOutput,
    },
  ],
};

describe('TertiaryToMultiResultsComponent', () => {
  let fixture: ComponentFixture<TertiaryToMultiResultsComponent>;
  let component: TertiaryToMultiResultsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
      declarations: [TertiaryToMultiResultsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TertiaryToMultiResultsComponent);
    component = fixture.componentInstance;
    component.calculation = mockResponse;
    fixture.detectChanges();
  });

  it('ensures that every result has its selection object instance', () => {
    expect(component.selected).toBeInstanceOf(MultiSelect);
    expect(component.selected?.fields.length).toEqual(mockResponse.results.length);
  });

  it('updates selection objects when calculation results changes', () => {
    const mockWithOneResult = JSON.parse(JSON.stringify(mockResponse)) as Calculation<TertiaryToMultiParams, MultiOutput>;
    mockWithOneResult.results = [mockWithOneResult.results[0]];

    component.calculation = mockWithOneResult;
    expect(component.selected?.fields.length).toEqual(mockWithOneResult.results.length);

    component.calculation = mockResponse;
    expect(component.selected?.fields.length).toEqual(mockResponse.results.length);
  });

  describe('All results', () => {
    beforeEach(() => {
      component.selected?.fields.forEach(result => {
        result.fields.consensualVisualization.activateField();
        result.fields.entries.fields.forEach(element => {
          element.fields.output2D.fields.bpSeq.activateField();
          element.fields.output2D.fields.ct.activateField();
          element.fields.output2D.fields.strands.activateField();
          element.fields.output2D.fields.imageInformation.activateField();
          element.fields.output2D.fields.structuralElements.activateField();
        });
      });
    });

    it('are selected when selectAll clicked', () => {
      component.selectAll();
      expect(component.selected?.isSelectedOrUnactive()).toBeTrue();
      expect(component.allSelected()).toBeTrue();
    });

    it('are selected when every result selected', () => {
      component.selected?.fields.forEach(item => {
        item.set(true);
      });
      expect(component.selected?.isSelectedOrUnactive()).toBeTrue();
      expect(component.allSelected()).toBeTrue();
    });

    it('are not fully selected when selectAll clicked and some results unselected', () => {
      component.selectAll();
      component.selected?.fields[0].set(false);
      expect(component.selected?.isSelectedOrUnactive()).toBeFalse();
      expect(component.allSelected()).toBeFalse();
    });

    it('are not fully selected when not all results selected', () => {
      component.selected?.fields.forEach(item => {
        item.set(true);
      });
      component.selected?.fields[0].set(false);
      expect(component.allSelected()).toBeFalse();
    });

    it('are not selected when selectAll and then unselectAll clicked', () => {
      component.selectAll();
      component.selectAll();
      expect(component.allSelected()).toBeFalse();
    });
  });
});
