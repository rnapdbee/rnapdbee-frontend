import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './calculations/pages/home/home.component';
import { TertiaryToDbnResultsComponent } from './calculations/pages/tertiary-to-dbn-results/tertiary-to-dbn-results.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'results/3d/:id', component: TertiaryToDbnResultsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
