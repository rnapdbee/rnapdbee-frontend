import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Result } from 'src/app/shared/models/calculation/calculation.model';
import { MultiOutput } from 'src/app/shared/models/output/multi-output.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { TertiaryToMultiParams } from 'src/app/shared/models/params/tertiary-to-multi-params.model';
import { MultiResultSelect } from 'src/app/shared/models/select/multi-result-select.model';
import { MultiResultComponent } from './multi-result.component';


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
    {
      output2D: mock2DOutput,
      adapterEnums: ['MC_ANNOTATE, RNAPOLIS'],
    },
  ],
};

const mockResult: Result<TertiaryToMultiParams, MultiOutput> = {
  params: mockParams,
  output: mockOutput,
};

describe('MultiResultComponent', () => {
  let fixture: ComponentFixture<MultiResultComponent>;
  let component: MultiResultComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiResultComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiResultComponent);
    component = fixture.componentInstance;
    component.result = mockResult;
    fixture.detectChanges();

    component.value.fields.consensualVisualization.activateField();
    component.value.fields.entries.fields.forEach(element => {
      element.fields.output2D.fields.bpSeq.activateField();
      element.fields.output2D.fields.ct.activateField();
      element.fields.output2D.fields.strands.activateField();
      element.fields.output2D.fields.imageInformation.activateField();
      element.fields.output2D.fields.structuralElements.activateField();
    });
  });

  it('ensures that every entry has its selection object instance', () => {
    expect(component.value).toBeInstanceOf(MultiResultSelect);
    expect(component.value.fields.entries.fields.length).toEqual(mockResult.output.entries.length);
  });

  it('updates model objects when result changes', () => {
    const mockWithOneEntry = JSON.parse(JSON.stringify(mockResult)) as Result<TertiaryToMultiParams, MultiOutput>;
    mockWithOneEntry.output.entries = [mockWithOneEntry.output.entries[0]];

    component.result = mockWithOneEntry;
    expect(component.value.fields.entries.fields.length).toEqual(mockWithOneEntry.output.entries.length);

    component.result = mockResult;
    expect(component.value.fields.entries.fields.length).toEqual(mockResult.output.entries.length);
  });

  it('is selected when all options selected', () => {
    component.value.fields.consensualVisualization.set(true);
    component.value.fields.entries.set(true);

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
    component.value.fields.consensualVisualization.set(false);
    expect(component.value.isSelectedOrUnactive()).toBeFalse();
    expect(component.isSelected()).toBeFalse();
  });

  it('is not fully selected when only few options selected', () => {
    component.value.set(false);
    component.value.fields.consensualVisualization.set(true);
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
