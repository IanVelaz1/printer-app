import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) { 
    let token = JSON.parse(localStorage.getItem('authData')).token;
    this.headers = new HttpHeaders({
      'token': token
    });
  }

  queryReports(queryObject: any) {
    let params = new HttpParams();
    if(queryObject.client) {
      params = params.append('client', queryObject.client);
    }

    if(queryObject.initialDate) {
      params = params.append('initialDate', queryObject.initialDate);
    }

    if(queryObject.finalDate) {
      params = params.append('finalDate', queryObject.finalDate);
    }

    if(queryObject.status) {
      params = params.append('status', queryObject.status);
    }

    return this.http.get(`${environment.SERVICIOS_REPORTES}/reportsByDates`, {
      headers: this.headers,
      params
    });
  }

}
