import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ErrorComponent } from './components/error/error.component';
import { ExamplePickerComponent } from './components/example-picker/example-picker.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SecondaryImageComponent } from './components/output/secondary-image/secondary-image.component';
import { SecondaryOutputComponent } from './components/output/secondary-output/secondary-output.component';
import { TertiaryInteractionsComponent } from './components/output/tertiary-interactions/tertiary-interactions.component';
import { TertiaryModelOutputComponent } from './components/output/tertiary-model-output/tertiary-model-output.component';
import { TertiaryResultComponent } from './components/output/tertiary-result/tertiary-result.component';
import {
  SecondaryToDbnParamsFormComponent,
} from './components/params-forms/secondary-to-dbn-params-form/secondary-to-dbn-params-form.component';
import {
  TertiaryToDbnParamsFormComponent,
} from './components/params-forms/tertiary-to-dbn-params-form/tertiary-to-dbn-params-form.component';
import {
  TertiaryToMultiParamsFormComponent,
} from './components/params-forms/tertiary-to-multi-params-form/tertiary-to-multi-params-form.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { ReanalyzePanelComponent } from './components/reanalyze-panel/reanalyze-panel.component';
import { StepComponent } from './components/step/step.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { SvgViewerComponent } from './components/svg-viewer/svg-viewer.component';
import { SecondaryUploadFormComponent } from './components/upload-forms/secondary-upload-form/secondary-upload-form.component';
import { TertiaryUploadFormComponent } from './components/upload-forms/tertiary-upload-form/tertiary-upload-form.component';

const COMPONENTS = [
  CheckboxComponent,
  ErrorComponent,
  ExamplePickerComponent,
  LoadingComponent,
  NavbarComponent,
  RadioButtonComponent,
  ReanalyzePanelComponent,
  StepComponent,
  SubmitButtonComponent,
  SvgViewerComponent,
  SecondaryImageComponent,
  SecondaryOutputComponent,
  SecondaryUploadFormComponent,
  SecondaryToDbnParamsFormComponent,
  TertiaryInteractionsComponent,
  TertiaryModelOutputComponent,
  TertiaryResultComponent,
  TertiaryUploadFormComponent,
  TertiaryToDbnParamsFormComponent,
  TertiaryToMultiParamsFormComponent,
];

const MODULES = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  RouterModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...MODULES,
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES,
  ],
})
export class SharedModule { }
