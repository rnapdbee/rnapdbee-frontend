import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DbnToImageInputFormComponent } from './components/dbn-to-image-input-form/dbn-to-image-input-form.component';
import { DbnToImageUploadFormComponent } from './components/dbn-to-image-input-form/dbn-to-image-upload-form/dbn-to-image-upload-form.component';
import { SecondaryToDbnInputFormComponent } from './components/secondary-to-dbn-input-form/secondary-to-dbn-input-form.component';
import { SecondaryToDbnUploadFormComponent } from './components/secondary-to-dbn-input-form/secondary-to-dbn-upload-form/secondary-to-dbn-upload-form.component';
import { TertiaryToDBNInputFormComponent } from './components/tertiary-to-dbn-input-form/tertiary-to-dbn-input-form.component';
import { TertiaryToDbnUploadFormComponent } from './components/tertiary-to-dbn-input-form/tertiary-to-dbn-upload-form/tertiary-to-dbn-upload-form.component';
import { TertiaryToMultiInputFormComponent } from './components/tertiary-to-multi-input-form/tertiary-to-multi-input-form.component';
import { TertiaryToMultiUploadFormComponent } from './components/tertiary-to-multi-input-form/tertiary-to-multi-upload-form/tertiary-to-multi-upload-form.component';
import { HomeComponent } from './pages/home/home.component';


const COMPONENTS = [
  HomeComponent,
  TertiaryToDBNInputFormComponent,
  TertiaryToDbnUploadFormComponent,
  SecondaryToDbnInputFormComponent,
  SecondaryToDbnUploadFormComponent,
  DbnToImageInputFormComponent,
  DbnToImageUploadFormComponent,
  TertiaryToMultiInputFormComponent,
  TertiaryToMultiUploadFormComponent,
];

const MODULES = [
  CommonModule,
  SharedModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CalculationsModule { }
