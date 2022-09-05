import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './pages/reports/reports.component';

const routes: Routes = [
  { path: '', component: ReportsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsModuleRouting {}