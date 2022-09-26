import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalculationType } from 'src/app/shared/models/calculation-type.enum';
import { HomeComponent } from './home.component';

const tertiaryToDBNInputForm = 'app-tertiary-to-dbn-input-form';
const secondaryToDBNInputForm = 'app-secondary-to-dbn-input-form';
const tertiaryToMultiInputForm = 'app-tertiary-to-multi-input-form';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    ({ debugElement } = fixture);
    fixture.detectChanges();
  });

  it('renders TertiaryToDBNInputForm by default', () => {
    const form = debugElement.query(By.css(tertiaryToDBNInputForm));
    const calcType = component.calculationType;
    expect(form).toBeTruthy();
    expect(calcType).toEqual(CalculationType.TertiaryToDBN);
  });

  describe('CalculationType', () => {
    it('renders TertiaryToDBNInputForm when set to TertiaryToDBN', () => {
      component.setCalculationType(CalculationType.TertiaryToDBN);
      fixture.detectChanges();
      const form = debugElement.query(By.css(tertiaryToDBNInputForm));
      expect(form).toBeTruthy();
    });

    it('renders SecondaryToDBNInputForm when set to SecondaryToDBN', () => {
      component.setCalculationType(CalculationType.SecondaryToDBN);
      fixture.detectChanges();
      const form = debugElement.query(By.css(secondaryToDBNInputForm));
      expect(form).toBeTruthy();
    });

    it('renders TertiaryToMultiInputForm when set to TertiaryToMultiSecondary', () => {
      component.setCalculationType(CalculationType.TertiaryToMultiSecondary);
      fixture.detectChanges();
      const form = debugElement.query(By.css(tertiaryToMultiInputForm));
      expect(form).toBeTruthy();
    });
  });
});
