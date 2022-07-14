import { Injectable } from '@angular/core';
import { Payment } from 'src/app/interfaces/payment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) { 
    let token = JSON.parse(localStorage.getItem('authData')).token;
    this.headers = new HttpHeaders({
      'token': token
    });
  }

  createPayment(payment: Payment) {
    return this.http.post(`${environment.PAYMENTS_SERVICES}`, payment , {headers: this.headers});
  }

  getPaymentsByNote(note: string) {
    return this.http.get(`${environment.PAYMENTS_SERVICES}/${note}`, {headers: this.headers});
  }

  editPayment(note: string, payment: Payment) {
    return this.http.put(`${environment.PAYMENTS_SERVICES}/${note}`, payment, {headers: this.headers});
  }

  deletePayment(note: string) {
    return this.http.delete(`${environment.PAYMENTS_SERVICES}/${note}`, {headers: this.headers});
  }
}
