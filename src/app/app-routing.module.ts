import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FateComponent } from './fate/fate.component';

const routes: Routes = [
  {
    path: 'fate',
    component: FateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
