import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DrawingResult, ImageInformation } from 'src/app/shared/models/output/secondary-output.model';
import { SecondaryImageComponent } from './secondary-image.component';

const mockSuccessfulVisualizationTool = 'SUCCESSFUL_DRAWER';
const mockFailedVisualizationTool = 'FAILED_DRAWER';

function createImageInformation(drawingResult: DrawingResult): ImageInformation {
  return {
    pathToSVGImage: '',
    successfulVisualizationTool: mockSuccessfulVisualizationTool,
    failedVisualizationTool: mockFailedVisualizationTool,
    drawingResult,
  };
}

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
    ({ debugElement } = fixture);
  });

  it('shows image when main drawer works', () => {
    component.imageInformation = createImageInformation(DrawingResult.DoneByMainDrawer);
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-svg-viewer'))).toBeTruthy();
    expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain(mockSuccessfulVisualizationTool);
  });

  it('shows image when main drawer fails but backup drawer works', () => {
    component.imageInformation = createImageInformation(DrawingResult.DoneByBackupDrawer);
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-svg-viewer'))).toBeTruthy();
    expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain(mockFailedVisualizationTool);
    expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain(mockSuccessfulVisualizationTool);
  });

  it('shows information when all drawers fail', () => {
    component.imageInformation = createImageInformation(DrawingResult.FailedByBothDrawers);
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-svg-viewer'))).toBeFalsy();
    expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain(mockFailedVisualizationTool);
  });

  it('shows information when image not drawn', () => {
    component.imageInformation = createImageInformation(DrawingResult.NotDrawn);
    fixture.detectChanges();
    expect(debugElement.query(By.css('app-svg-viewer'))).toBeFalsy();
    expect(debugElement.query(By.css('p')).nativeElement.textContent).toContain('Image not drawn');
  });
});
