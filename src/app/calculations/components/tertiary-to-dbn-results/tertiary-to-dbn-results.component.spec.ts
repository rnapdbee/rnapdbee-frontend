import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { Residue, TertiaryInteractions, TertiaryOutput } from 'src/app/shared/models/output/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/params/tertiary-to-dbn-params.model';
import { TertiarySelect } from 'src/app/shared/models/select/tertiary-select.model';
import { TertiaryToDbnResultsComponent } from './tertiary-to-dbn-results.component';

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

describe('TertiaryToDbnResultsComponent', () => {
  let fixture: ComponentFixture<TertiaryToDbnResultsComponent>;
  let component: TertiaryToDbnResultsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TertiaryToDbnResultsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TertiaryToDbnResultsComponent);
    component = fixture.componentInstance;
    component.calculation = mockResponse;
    fixture.detectChanges();
  });

  it('ensures that every result has its selection object instance', () => {
    expect(component.selected).toBeInstanceOf(TertiarySelect);
    expect(component.selected?.fields.length).toEqual(mockResponse.results.length);
  });

  it('updates selection objects when calculation results changes', () => {
    const mockWithOneResult = JSON.parse(JSON.stringify(mockResponse)) as Calculation<TertiaryToDbnParams, TertiaryOutput>;
    mockWithOneResult.results = [mockWithOneResult.results[0]];

    component.calculation = mockWithOneResult;
    expect(component.selected?.fields.length).toEqual(mockWithOneResult.results.length);

    component.calculation = mockResponse;
    expect(component.selected?.fields.length).toEqual(mockResponse.results.length);
  });


  describe('All results', () => {
    beforeEach(() => {
      component.selected?.fields.forEach(result => {
        result.fields.forEach(model => {
          model.fields.messages.activateField();
          model.fields.canonicalInteractions.activateField();
          model.fields.nonCanonicalInteractions.activateField();
          model.fields.interStrandInteractions.activateField();
          model.fields.stackingInteractions.activateField();
          model.fields.basePhosphateInteractions.activateField();
          model.fields.baseRiboseInteractions.activateField();
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
