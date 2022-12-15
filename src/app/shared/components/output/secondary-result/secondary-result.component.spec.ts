import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Result } from 'src/app/shared/models/calculation/calculation.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/params/secondary-to-dbn-params.model';
import { SecondaryResultComponent } from './secondary-result.component';


const mockParams: SecondaryToDbnParams = {
  removeIsolated: true,
  structuralElementsHandling: 'USE_PSEUDOKNOTS',
  visualizationTool: 'VARNA',
};

const mockOutput: SecondaryOutput = {
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

const mockResult: Result<SecondaryToDbnParams, SecondaryOutput> = {
  params: mockParams,
  output: mockOutput,
};

describe('SecondaryResultComponent', () => {
  let fixture: ComponentFixture<SecondaryResultComponent>;
  let component: SecondaryResultComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryResultComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryResultComponent);
    component = fixture.componentInstance;
    component.result = mockResult;
    fixture.detectChanges();

    component.value.fields.bpSeq.activateField();
    component.value.fields.ct.activateField();
    component.value.fields.imageInformation.activateField();
    component.value.fields.interactions.activateField();
    component.value.fields.strands.activateField();
    component.value.fields.structuralElements.activateField();
  });

  it('is selected when all options selected', () => {
    Object.keys(component.value.fields).forEach(item => {
      component.value.fields[item].set(true);
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
    component.value.fields.bpSeq.set(false);
    expect(component.value.isSelectedOrUnactive()).toBeFalse();
    expect(component.isSelected()).toBeFalse();
  });

  it('is not fully selected when only few options selected', () => {
    Object.keys(component.value.fields).forEach(item => {
      component.value.fields[item].set(false);
    });
    component.value.fields.bpSeq.set(true);
    component.value.fields.ct.set(true);
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
