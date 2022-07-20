import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuardService } from './guards/authGuard';
import { SellFormComponent } from './components/sell-form/sell-form.component';
import { ListSalesComponent } from './components/list-sales/list-sales.component';
import { ModalLoadingComponent } from './components/modal-loading/modal-loading.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ModalTotalSaleComponent } from './components/sell-form/modal-total-sale/modal-total-sale.component';

export const componentsArray = [
  LoginComponent,
  IndexComponent,
  NavbarComponent,
  SellFormComponent,
  ListSalesComponent,
  ModalLoadingComponent,
  AlertsComponent,
  ModalTotalSaleComponent 
]

const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'sales', component: SellFormComponent, canActivate: [AuthGuardService] },
  { path: 'sales/:id', component: SellFormComponent, canActivate: [AuthGuardService] },
  { path: 'list-sales', component: ListSalesComponent, canActivate: [AuthGuardService] },
  { path: 'clients', loadChildren: () => import('./modules/clients/clients.module').then((m) => m.ClientsModule)},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
