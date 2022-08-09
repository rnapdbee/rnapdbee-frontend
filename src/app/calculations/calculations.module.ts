import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DbnToImageInputFormComponent } from './components/dbn-to-image-input-form/dbn-to-image-input-form.component';
import { SecondaryToDbnInputFormComponent } from './components/secondary-to-dbn-input-form/secondary-to-dbn-input-form.component';
import { TertiaryToDBNInputFormComponent } from './components/tertiary-to-dbn-input-form/tertiary-to-dbn-input-form.component';
import { TertiaryToMultiInputFormComponent } from './components/tertiary-to-multi-input-form/tertiary-to-multi-input-form.component';
import { HomeComponent } from './pages/home/home.component';


const COMPONENTS = [
  HomeComponent,
  TertiaryToDBNInputFormComponent,
  SecondaryToDbnInputFormComponent,
  DbnToImageInputFormComponent,
  TertiaryToMultiInputFormComponent,
];

const MODULES = [
  CommonModule,
  SharedModule,
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
  ],
})
export class CalculationsModule { }
