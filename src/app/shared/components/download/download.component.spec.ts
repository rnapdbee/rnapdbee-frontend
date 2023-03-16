import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SecondarySelect } from '../../models/select/secondary-select.model';
import { DownloadComponent } from './download.component';

describe('DownloadComponent', () => {
  let fixture: ComponentFixture<DownloadComponent>;
  let component: DownloadComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
      declarations: [DownloadComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
    component.selected = new SecondarySelect(1);
    (component.selected as SecondarySelect).fields
      .map(item => item.fields)
      .forEach(fields => {
        fields.bpSeq.activateField();
        fields.ct.activateField();
        fields.imageInformation.activateField();
        fields.interactions.activateField();
        fields.strands.activateField();
        fields.structuralElements.activateField();
      });
    fixture.detectChanges();
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
