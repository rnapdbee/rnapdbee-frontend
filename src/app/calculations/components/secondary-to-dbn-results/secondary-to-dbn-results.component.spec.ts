import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/params/secondary-to-dbn-params.model';
import { SecondarySelect } from 'src/app/shared/models/select/secondary-select.model';
import { SecondaryToDbnResultsComponent } from './secondary-to-dbn-results.component';

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


describe('SecondaryToDbnResultsComponent', () => {
  let fixture: ComponentFixture<SecondaryToDbnResultsComponent>;
  let component: SecondaryToDbnResultsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [SecondaryToDbnResultsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryToDbnResultsComponent);
    component = fixture.componentInstance;
    component.calculation = mockResponse;
    fixture.detectChanges();
  });

  it('ensures that every result has its selection object instance', () => {
    expect(component.selected).toBeInstanceOf(SecondarySelect);
    expect(component.selected?.fields.length).toEqual(mockResponse.results.length);
  });

  it('updates selection objects when calculation results changes', () => {
    const mockWithOneResult = JSON.parse(JSON.stringify(mockResponse)) as Calculation<SecondaryToDbnParams, SecondaryOutput>;
    mockWithOneResult.results = [mockWithOneResult.results[0]];

    component.calculation = mockWithOneResult;
    expect(component.selected?.fields.length).toEqual(mockWithOneResult.results.length);

    component.calculation = mockResponse;
    expect(component.selected?.fields.length).toEqual(mockResponse.results.length);
  });

  describe('All results', () => {
    beforeEach(() => {
      component.selected?.fields.forEach(item => {
        item.fields.bpSeq.activateField();
        item.fields.ct.activateField();
        item.fields.imageInformation.activateField();
        item.fields.interactions.activateField();
        item.fields.strands.activateField();
        item.fields.structuralElements.activateField();
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
