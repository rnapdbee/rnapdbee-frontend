import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './calculations/pages/home/home.component';
import { MultiPageComponent } from './calculations/pages/multi-page/multi-page.component';
import { PageNotFoundComponent } from './calculations/pages/page-not-found/page-not-found.component';
import { SecondaryPageComponent } from './calculations/pages/secondary-page/secondary-page.component';
import { TertiaryPageComponent } from './calculations/pages/tertiary-page/tertiary-page.component';
import { AboutPageComponent } from './informations/pages/about/about-page.component';
import { CiteUsPageComponent } from './informations/pages/cite-us/cite-us-page.component';
import { HelpPageComponent } from './informations/pages/help/help-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'results/3d/:id', component: TertiaryPageComponent },
  { path: 'results/2d/:id', component: SecondaryPageComponent },
  { path: 'results/multi/:id', component: MultiPageComponent },
  { path: 'help', component: HelpPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'cite-us', component: CiteUsPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
