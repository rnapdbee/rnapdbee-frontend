import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/params/secondary-to-dbn-params.model';
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
      imports: [HttpClientModule, MatSnackBarModule],
      declarations: [SecondaryToDbnResultsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryToDbnResultsComponent);
    component = fixture.componentInstance;
    component.calculation = mockResponse;
    fixture.detectChanges();
  });

  it('ensures that every result has its selection object instance', () => {
    component.calculation = mockResponse;
    expect(component.selected.length).toEqual(mockResponse.results.length);
  });

  it('updates selection objects when calculation results changes', () => {
    const mockWithOneResult = { ...mockResponse };
    mockWithOneResult.results = [mockWithOneResult.results[0]];

    component.calculation = mockWithOneResult;
    expect(component.selected.length).toEqual(mockWithOneResult.results.length);

    component.calculation = mockResponse;
    expect(component.selected.length).toEqual(mockResponse.results.length);
  });

  describe('Particular result', () => {
    beforeEach(() => {
      component.selected.forEach(item => {
        item.fields.bpSeq.activateField();
        item.fields.ct.activateField();
        item.fields.imageInformation.activateField();
        item.fields.interactions.activateField();
        item.fields.strands.activateField();
        item.fields.structuralElements.activateField();
      });
    });

    it('is selected when selectThis clicked', () => {
      component.selectOne(0);
      expect(component.selected[0].isSelectedOrUnactive()).toBeTrue();
    });

    it('is selected when selectAll clicked', () => {
      component.selectAll();
      expect(component.selected[0].isSelectedOrUnactive()).toBeTrue();
    });

    it('is selected when all checkboxes checked', () => {
      Object.keys(component.selected[0].fields).forEach(item => {
        component.selected[0].fields[item].set(true);
      });
      expect(component.selected[0].isSelectedOrUnactive()).toBeTrue();
    });

    it('is not fully selected when selectThis clicked and some checkboxes unchecked', () => {
      component.selectOne(0);
      component.selected[0].fields.bpSeq.value = false;
      expect(component.selected[0].isSelectedOrUnactive()).toBeFalse();
    });

    it('is not fully selected when not all checkboxes checked', () => {
      component.selected[0].fields.bpSeq.value = true;
      component.selected[0].fields.ct.value = true;
      expect(component.selected[0].isSelectedOrUnactive()).toBeFalse();
    });

    it('is not selected when selectThis and then unselectThis clicked', () => {
      component.selectOne(0);
      component.selectOne(0);
      expect(component.selected[0].isSelectedOrUnactive()).toBeFalse();
    });

    it('is not selected when unselectAll clicked', () => {
      component.selectAll();
      component.selectAll();
      expect(component.selected[0].isSelectedOrUnactive()).toBeFalse();
    });
  });

  describe('All results', () => {
    beforeEach(() => {
      component.selected.forEach(item => {
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
      expect(component.allSelected()).toBeTrue();
    });

    it('are selected when all checkboxes in all results checked', () => {
      const selectResultCheckboxes = (i: number) => {
        Object.keys(component.selected[i].fields).forEach(item => {
          component.selected[i].fields[item].set(true);
        });
      };
      for (let i = 0; i < component.selected.length; i += 1) {
        selectResultCheckboxes(i);
      }
      expect(component.allSelected()).toBeTrue();
    });

    it('are selected when selectThis clicked for all results', () => {
      for (let i = 0; i < component.selected.length; i += 1) {
        component.selectOne(i);
      }
      expect(component.allSelected()).toBeTrue();
    });

    it('are not fully selected when selectAll clicked and some checkboxes unchecked', () => {
      component.selectAll();
      component.selected[0].fields.bpSeq.value = false;
      expect(component.allSelected()).toBeFalse();
    });

    it('are not fully selected when not all checkboxes checked', () => {
      for (let i = 0; i < component.selected.length; i += 1) {
        component.selected[i].fields.bpSeq.value = true;
        component.selected[i].fields.ct.value = true;
      }
      expect(component.allSelected()).toBeFalse();
    });

    it('are not fully selected when selectThis clicked but for only one result', () => {
      component.selectOne(0);
      expect(component.allSelected()).toBeFalse();
    });

    it('are not fully selected when selectAll clicked and unselectThis clicked', () => {
      component.selectAll();
      component.selectOne(0);
      expect(component.allSelected()).toBeFalse();
    });

    it('are not selected when selectAll and then unselectAll clicked', () => {
      component.selectAll();
      component.selectAll();
      expect(component.allSelected()).toBeFalse();
    });
  });
});
