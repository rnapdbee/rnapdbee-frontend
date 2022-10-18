import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SecondaryToDbnInputFormComponent } from './components/secondary-to-dbn-input-form/secondary-to-dbn-input-form.component';
import { TertiaryToDBNInputFormComponent } from './components/tertiary-to-dbn-input-form/tertiary-to-dbn-input-form.component';
import { TertiaryToDbnResultsComponent } from './components/tertiary-to-dbn-results/tertiary-to-dbn-results.component';
import { TertiaryToMultiInputFormComponent } from './components/tertiary-to-multi-input-form/tertiary-to-multi-input-form.component';
import { HomeComponent } from './pages/home/home.component';
import { TertiaryPageComponent } from './pages/tertiary-page/tertiary-page.component';


const COMPONENTS = [
  HomeComponent,
  TertiaryPageComponent,
  TertiaryToDBNInputFormComponent,
  SecondaryToDbnInputFormComponent,
  TertiaryToMultiInputFormComponent,
  TertiaryToDbnResultsComponent,
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
