import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientsMainComponent } from "./pages/clients-main/clients-main.component";
import { SpcificClientComponent } from "./pages/spcific-client/spcific-client.component";

const routes: Routes = [
  {
    path: "",
    component: ClientsMainComponent,
  },
  {
    path: "createClient",
    component: SpcificClientComponent,
  },
  {
    path: 'editClient/:id',
    component: SpcificClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
