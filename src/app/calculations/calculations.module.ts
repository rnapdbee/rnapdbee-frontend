import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';


const MODULES = [
  CommonModule,
  SharedModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: []
})
export class CalculationsModule { }
