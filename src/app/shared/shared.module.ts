import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ExamplePickerComponent } from './components/example-picker/example-picker.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { StepComponent } from './components/step/step.component';
import { DbnUploadFormComponent } from './components/upload-forms/dbn-upload-form/dbn-upload-form.component';
import { SecondaryUploadFormComponent } from './components/upload-forms/secondary-upload-form/secondary-upload-form.component';
import { TertiaryUploadFormComponent } from './components/upload-forms/tertiary-upload-form/tertiary-upload-form.component';


const COMPONENTS = [
  CheckboxComponent,
  ExamplePickerComponent,
  NavbarComponent,
  RadioButtonComponent,
  StepComponent,
  DbnUploadFormComponent,
  SecondaryUploadFormComponent,
  TertiaryUploadFormComponent,
];

const MODULES = [
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatRadioModule,
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
  ]
})
export class SharedModule { }
