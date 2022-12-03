import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { DrawingResult, SecondaryOutput } from 'src/app/shared/models/output/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/params/secondary-to-dbn-params.module';
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

  it('ensures that every result has its selection flags instance', () => {
    component.calculation = mockResponse;
    expect(component.selected.length).toEqual(mockResponse.results.length);
  });

  it('updates selection flags when calculation results changes', () => {
    const mockWithOneResult = { ...mockResponse };
    mockWithOneResult.results = [mockWithOneResult.results[0]];

    component.calculation = mockWithOneResult;
    expect(component.selected.length).toEqual(mockWithOneResult.results.length);

    component.calculation = mockResponse;
    expect(component.selected.length).toEqual(mockResponse.results.length);
  });

  describe('Particular result', () => {
    it('is selected when selectThis clicked', () => {
      component.select(0);
      expect(component.isSelected(0)).toBeTrue();
    });

    it('is selected when selectAll clicked', () => {
      component.selectAll();
      expect(component.isSelected(0)).toBeTrue();
    });

    it('is selected when all checkboxes checked', () => {
      Object.keys(component.selected[0]).forEach(item => {
        component.selected[0][item as keyof typeof component.selected[number]] = true;
      });
      expect(component.isSelected(0)).toBeTrue();
    });

    it('is not fully selected when selectThis clicked and some checkboxes unchecked', () => {
      component.select(0);
      component.selected[0].bpSeq = false;
      expect(component.isSelected(0)).toBeFalse();
    });

    it('is not fully selected when not all checkboxes checked', () => {
      component.selected[0].bpSeq = true;
      component.selected[0].ct = true;
      expect(component.isSelected(0)).toBeFalse();
    });

    it('is not selected when selectThis and then unselectThis clicked', () => {
      component.select(0);
      component.select(0);
      expect(component.isSelected(0)).toBeFalse();
    });

    it('is not selected when unselectAll clicked', () => {
      component.selectAll();
      component.selectAll();
      expect(component.isSelected(0)).toBeFalse();
    });
  });

  describe('All results', () => {
    it('are selected when selectAll clicked', () => {
      component.selectAll();
      expect(component.isAllSelected()).toBeTrue();
    });

    it('are selected when all checkboxes in all results checked', () => {
      const selectResultCheckboxes = (i: number) => {
        Object.keys(component.selected[i]).forEach(item => {
          component.selected[i][item as keyof typeof component.selected[number]] = true;
        });
      };
      for (let i = 0; i < component.selected.length; i += 1) {
        selectResultCheckboxes(i);
      }
      expect(component.isAllSelected()).toBeTrue();
    });

    it('are selected when selectThis clicked for all results', () => {
      for (let i = 0; i < component.selected.length; i += 1) {
        component.select(i);
      }
      expect(component.isAllSelected()).toBeTrue();
    });

    it('are not fully selected when selectAll clicked and some checkboxes unchecked', () => {
      component.selectAll();
      component.selected[0].bpSeq = false;
      expect(component.isAllSelected()).toBeFalse();
    });

    it('are not fully selected when not all checkboxes checked', () => {
      for (let i = 0; i < component.selected.length; i += 1) {
        component.selected[i].bpSeq = true;
        component.selected[i].ct = true;
      }
      expect(component.isAllSelected()).toBeFalse();
    });

    it('are not fully selected when selectThis clicked but for only one result', () => {
      component.select(0);
      expect(component.isAllSelected()).toBeFalse();
    });

    it('are not fully selected when selectAll clicked and unselectThis clicked', () => {
      component.selectAll();
      component.select(0);
      expect(component.isAllSelected()).toBeFalse();
    });

    it('are not selected when selectAll and then unselectAll clicked', () => {
      component.selectAll();
      component.selectAll();
      expect(component.isAllSelected()).toBeFalse();
    });
  });
});
