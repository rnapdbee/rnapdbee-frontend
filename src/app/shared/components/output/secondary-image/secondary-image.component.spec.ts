/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DrawingResult, ImageInformation } from 'src/app/shared/models/secondary-output.model';
import { SecondaryImageComponent } from './secondary-image.component';

const mockSuccessfulVisualizationTool = 'SUCESSFUL_DRAWER';
const mockFailedVisualizationTool = 'SUCESSFUL_DRAWER';

const mockImageInformation: ImageInformation = {
  pathToSVGImage: '',
  successfulVisualizationTool: mockSuccessfulVisualizationTool,
  failedVisualizationTool: mockFailedVisualizationTool,
  drawingResult: DrawingResult.DoneByMainDrawer,
};


describe('SecondaryImageComponent', () => {
  let fixture: ComponentFixture<SecondaryImageComponent>;
  let component: SecondaryImageComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecondaryImageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryImageComponent);
    component = fixture.componentInstance;
    component.imageInformation = mockImageInformation;
    ({ debugElement } = fixture);
    fixture.detectChanges();
  });

  it('shows image when main drawer works', () => {
    if (component.imageInformation) {
      component.imageInformation.drawingResult = DrawingResult.DoneByMainDrawer;
    }
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-svg-viewer'))).toBeTruthy();
    expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain(mockSuccessfulVisualizationTool);
  });

  it('shows image when main drawer fails but backup drawer works', () => {
    if (component.imageInformation) {
      component.imageInformation.drawingResult = DrawingResult.DoneByBackupDrawer;
    }
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-svg-viewer'))).toBeTruthy();
    expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain(mockSuccessfulVisualizationTool);
    expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain(mockFailedVisualizationTool);
  });

  it('shows information when all drawers fail', () => {
    if (component.imageInformation) {
      component.imageInformation.drawingResult = DrawingResult.FailedByBothDrawers;
    }
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-svg-viewer'))).toBeFalsy();
    expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain(mockFailedVisualizationTool);
  });

  it('shows information when image not drawn', () => {
    if (component.imageInformation) {
      component.imageInformation.drawingResult = DrawingResult.NotDrawn;
    }
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-svg-viewer'))).toBeFalsy();
    expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain('Image not drawn');
  });
});
