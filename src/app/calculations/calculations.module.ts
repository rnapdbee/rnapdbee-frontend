import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TeriaryToDBNInputFormComponent } from './components/teriary-to-dbn-input-form/teriary-to-dbn-input-form.component';
import { HomeComponent } from './pages/home/home.component';


const COMPONENTS = [
  HomeComponent,
  TeriaryToDBNInputFormComponent,
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
