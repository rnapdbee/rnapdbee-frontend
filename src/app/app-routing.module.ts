import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './calculations/pages/home/home.component';
import { MultiPageComponent } from './calculations/pages/multi-page/multi-page.component';
import { SecondaryPageComponent } from './calculations/pages/secondary-page/secondary-page.component';
import { TertiaryPageComponent } from './calculations/pages/tertiary-page/tertiary-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'results/3d/:id', component: TertiaryPageComponent },
  { path: 'results/2d/:id', component: SecondaryPageComponent },
  { path: 'results/multi/:id', component: MultiPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
