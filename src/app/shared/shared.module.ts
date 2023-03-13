import { ClipboardModule } from '@angular/cdk/clipboard';
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
import { CalculationLoadingComponent } from './components/calculation-loading/calculation-loading.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ErrorComponent } from './components/error/error.component';
import { ExamplePickerComponent } from './components/example-picker/example-picker.component';
import { FooterComponent } from './components/footer/footer.component';
import { FornaViewerComponent } from './components/forna-viewer/forna-viewer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MultiEntryComponent } from './components/output/multi-entry/multi-entry.component';
import { MultiResultComponent } from './components/output/multi-result/multi-result.component';
import { SecondaryImageComponent } from './components/output/secondary-image/secondary-image.component';
import { SecondaryOutputComponent } from './components/output/secondary-output/secondary-output.component';
import { SecondaryResultComponent } from './components/output/secondary-result/secondary-result.component';
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
import { RequestLoadingComponent } from './components/request-loading/request-loading.component';
import { StepComponent } from './components/step/step.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { SvgViewerComponent } from './components/svg-viewer/svg-viewer.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { SecondaryUploadFormComponent } from './components/upload-forms/secondary-upload-form/secondary-upload-form.component';
import { TertiaryUploadFormComponent } from './components/upload-forms/tertiary-upload-form/tertiary-upload-form.component';
import { VarnaLegendComponent } from './components/varna-legend/varna-legend.component';
import { WeblogoLegendComponent } from './components/weblogo-legend/weblogo-legend.component';

const COMPONENTS = [
  CalculationLoadingComponent,
  CheckboxComponent,
  ErrorComponent,
  ExamplePickerComponent,
  FooterComponent,
  FornaViewerComponent,
  NavbarComponent,
  RadioButtonComponent,
  ReanalyzePanelComponent,
  RequestLoadingComponent,
  StepComponent,
  SubmitButtonComponent,
  SvgViewerComponent,
  TextAreaComponent,
  SecondaryImageComponent,
  SecondaryOutputComponent,
  SecondaryResultComponent,
  SecondaryUploadFormComponent,
  SecondaryToDbnParamsFormComponent,
  TertiaryInteractionsComponent,
  TertiaryModelOutputComponent,
  TertiaryResultComponent,
  TertiaryUploadFormComponent,
  TertiaryToDbnParamsFormComponent,
  TertiaryToMultiParamsFormComponent,
  MultiEntryComponent,
  MultiResultComponent,
  VarnaLegendComponent,
  WeblogoLegendComponent,
];

const MODULES = [
  CommonModule,
  ClipboardModule,
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
