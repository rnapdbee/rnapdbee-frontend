import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TertiaryToDBNInputFormComponent } from './components/tertiary-to-dbn-input-form/tertiary-to-dbn-input-form.component';
import { HomeComponent } from './pages/home/home.component';


const COMPONENTS = [
  HomeComponent,
  TertiaryToDBNInputFormComponent,
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
