import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Result } from 'src/app/shared/models/calculation/calculation.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { Residue, TertiaryInteractions, TertiaryOutput } from 'src/app/shared/models/output/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/params/tertiary-to-dbn-params.model';
import { TertiaryResultSelect } from 'src/app/shared/models/select/tertiary-result-select.model';
import { TertiaryResultComponent } from './tertiary-result.component';


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

const mockResult: Result<TertiaryToDbnParams, TertiaryOutput> = {
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
      {
        modelNumber: 2,
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
};

describe('TertiaryResultComponent', () => {
  let fixture: ComponentFixture<TertiaryResultComponent>;
  let component: TertiaryResultComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TertiaryResultComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TertiaryResultComponent);
    component = fixture.componentInstance;
    component.result = mockResult;
    fixture.detectChanges();

    component.value.fields.forEach(item => {
      item.fields.messages.activateField();
      item.fields.canonicalInteractions.activateField();
      item.fields.nonCanonicalInteractions.activateField();
      item.fields.interStrandInteractions.activateField();
      item.fields.stackingInteractions.activateField();
      item.fields.basePhosphateInteractions.activateField();
      item.fields.baseRiboseInteractions.activateField();
    });
  });

  it('ensures that every model has its selection object instance', () => {
    expect(component.value).toBeInstanceOf(TertiaryResultSelect);
    expect(component.value.fields.length).toEqual(mockResult.output.models.length);
  });

  it('updates model objects when result changes', () => {
    const mockWithOneModel = JSON.parse(JSON.stringify(mockResult)) as Result<TertiaryToDbnParams, TertiaryOutput>;
    mockWithOneModel.output.models = [mockWithOneModel.output.models[0]];

    component.result = mockWithOneModel;
    expect(component.value.fields.length).toEqual(mockWithOneModel.output.models.length);

    component.result = mockResult;
    expect(component.value.fields.length).toEqual(mockResult.output.models.length);
  });

  it('is selected when all options selected', () => {
    component.value.fields.forEach(item => {
      item.set(true);
    });

    expect(component.value.isSelectedOrUnactive()).toBeTrue();
    expect(component.isSelected()).toBeTrue();
  });

  it('is selected select clicked', () => {
    component.select();
    expect(component.value.isSelectedOrUnactive()).toBeTrue();
    expect(component.isSelected()).toBeTrue();
  });

  it('is not fully selected when select clicked and some options unselected', () => {
    component.select();
    component.value.fields[0].set(false);
    expect(component.value.isSelectedOrUnactive()).toBeFalse();
    expect(component.isSelected()).toBeFalse();
  });

  it('is not fully selected when only few options selected', () => {
    component.value.set(false);
    component.value.fields[0].set(true);
    expect(component.value.isSelectedOrUnactive()).toBeFalse();
    expect(component.isSelected()).toBeFalse();
  });

  it('is not fully selected when select and then unselect clicked', () => {
    component.select();
    component.select();
    expect(component.value.isSelectedOrUnactive()).toBeFalse();
    expect(component.isSelected()).toBeFalse();
  });
});
