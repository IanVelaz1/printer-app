import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './pages/reports/reports.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsModuleRouting } from './reports.module.routing';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { NonPayedNotesComponent } from './components/non-payed-notes/non-payed-notes.component';
import { MatTableModule } from '@angular/material/table';
import { PayedNotesComponent } from './components/payed-notes/payed-notes.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AmountsOwedByCustomerComponent } from './components/amounts-owed-by-customer/amounts-owed-by-customer.component';

@NgModule({
  declarations: [
    ReportsComponent,
    NonPayedNotesComponent,
    PayedNotesComponent,
    AmountsOwedByCustomerComponent
  ],
  imports: [
    CommonModule,
    ReportsModuleRouting,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatProgressBarModule
  ]
})
export class ReportsModule { }
