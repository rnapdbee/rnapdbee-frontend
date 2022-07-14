import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TertiaryToDBNInputFormComponent } from './components/tertiary-to-dbn-input-form/tertiary-to-dbn-input-form.component';
import { TertiaryToDbnUploadFormComponent } from './components/tertiary-to-dbn-input-form/tertiary-to-dbn-upload-form/tertiary-to-dbn-upload-form.component';
import { HomeComponent } from './pages/home/home.component';
import { SecondaryToDbnInputFormComponent } from './components/secondary-to-dbn-input-form/secondary-to-dbn-input-form.component';
import { SecondaryToDbnUploadFormComponent } from './components/secondary-to-dbn-input-form/secondary-to-dbn-upload-form/secondary-to-dbn-upload-form.component';


const COMPONENTS = [
  HomeComponent,
  TertiaryToDBNInputFormComponent,
  TertiaryToDbnUploadFormComponent,
  SecondaryToDbnInputFormComponent,
  SecondaryToDbnUploadFormComponent,
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
