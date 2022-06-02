import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DotsToImageInputFormComponent } from './components/dots-to-image-input-form/dots-to-image-input-form.component';
import { ThreeDToDotsInputFormComponent } from './components/three-d-to-dots-input-form/three-d-to-dots-input-form.component';
import { ThreeDToMultiTwoDInputFormComponent } from './components/three-d-to-multi-two-d-input-form/three-d-to-multi-two-d-input-form.component';
import { TwoDToDotsInputFormComponent } from './components/two-d-to-dots-input-form/two-d-to-dots-input-form.component';
import { HomeComponent } from './pages/home/home.component';


const COMPONENTS = [
  HomeComponent,
  ThreeDToDotsInputFormComponent,
  TwoDToDotsInputFormComponent,
  DotsToImageInputFormComponent,
  ThreeDToMultiTwoDInputFormComponent
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
