import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, componentsArray } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {ServicesArray} from './export-services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgChartsModule } from 'ng2-charts';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import { MainInterceptor } from './services/interceptor';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    componentsArray
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    NgChartsModule,
    MatExpansionModule,
    MatCardModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [ServicesArray, {provide: MAT_DATE_LOCALE, useValue: 'es-MX'}, {
     provide: HTTP_INTERCEPTORS,
     useClass: MainInterceptor,
     multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
