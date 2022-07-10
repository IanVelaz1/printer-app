import { Injectable } from '@angular/core';
import { Payment } from 'src/app/interfaces/payment';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient
  ) { }

  createPayment(payment: Payment) {
    return this.http.post(`${environment.PAYMENTS_SERVICES}`, payment);
  }

  getPaymentsByNote(note: string) {
    return this.http.get(`${environment.PAYMENTS_SERVICES}/${note}`);
  }

  editPayment(note: string, payment: Payment) {
    return this.http.put(`${environment.PAYMENTS_SERVICES}/${note}`, payment);
  }

  deletePayment(note: string) {
    return this.http.delete(`${environment.PAYMENTS_SERVICES}/${note}`);
  }
}
