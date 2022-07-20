import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsRoutingModule } from './clients.module.routing';
import { ClientsMainComponent } from './pages/clients-main/clients-main.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { SpcificClientComponent } from './pages/spcific-client/spcific-client.component';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatExpansionModule
  ],
  declarations: [
    ClientsMainComponent,
    SpcificClientComponent
  ],
  providers: []
})
export class ClientsModule {}