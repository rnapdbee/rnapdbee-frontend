import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { StepComponent } from './components/step/step.component';

const COMPONENTS = [
  NavbarComponent,
  StepComponent,
  RadioButtonComponent,
];

const MODULES = [
  CommonModule,
  MatIconModule,
  RouterModule,
  MatRadioModule,
  FormsModule,
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
