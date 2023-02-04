import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AboutContentComponent } from './components/about-content/about-content.component';
import { CiteUsContentComponent } from './components/cite-us-content/cite-us-content.component';
import { HelpContentComponent } from './components/help-content/help-content.component';
import { TableOfContentsComponent } from './components/table-of-contents/table-of-contents.component';
import { AboutPageComponent } from './pages/about/about-page.component';
import { CiteUsPageComponent } from './pages/cite-us/cite-us-page.component';
import { HelpPageComponent } from './pages/help/help-page.component';

const MODULES = [
  CommonModule,
  SharedModule,
];

@NgModule({
  declarations: [
    AboutPageComponent,
    AboutContentComponent,
    CiteUsPageComponent,
    CiteUsContentComponent,
    HelpPageComponent,
    HelpContentComponent,
    TableOfContentsComponent,
  ],
  imports: [
    ...MODULES,
  ],
  exports: [],
})
export class InformationsModule { }
