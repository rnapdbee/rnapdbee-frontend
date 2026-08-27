import { beforeEach, describe, expect, it } from 'vitest';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
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
      declarations: [DownloadComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatSnackBarModule],
      providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())],
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
    expect(component.selected?.isSelectedOrUnactive()).toBe(true);
    expect(component.allSelected()).toBe(true);
  });

  it('are selected when every result selected', () => {
    component.selected?.fields.forEach(item => {
      item.set(true);
    });
    expect(component.selected?.isSelectedOrUnactive()).toBe(true);
    expect(component.allSelected()).toBe(true);
  });

  it('are not fully selected when selectAll clicked and some results unselected', () => {
    component.selectAll();
    component.selected?.fields[0].set(false);
    expect(component.selected?.isSelectedOrUnactive()).toBe(false);
    expect(component.allSelected()).toBe(false);
  });

  it('are not fully selected when not all results selected', () => {
    component.selected?.fields.forEach(item => {
      item.set(true);
    });
    component.selected?.fields[0].set(false);
    expect(component.allSelected()).toBe(false);
  });

  it('are not selected when selectAll and then unselectAll clicked', () => {
    component.selectAll();
    component.selectAll();
    expect(component.allSelected()).toBe(false);
  });
});
