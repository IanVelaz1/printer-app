import { Component, OnInit, ViewChild } from '@angular/core';
import {NotesService} from '../../services/notes/notes.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { Payment } from 'src/app/interfaces/payment';
import { NoteGenerationService } from 'src/app/services/noteGeneration/note-generation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})
export class ListSalesComponent implements OnInit {

  @ViewChild('modal') autoShownModal: ModalDirective;
  @ViewChild('modalPayment') modalPayment: ModalDirective;

  foundPayments: any[] = [];

  constructor(
    private notesService:NotesService,
    private paymentsService: PaymentsService,
    private noteGenerationService: NoteGenerationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.searchForSale();
  }

  queryObj = {
    date: '',
    noteId: '',
    client: ''
  }

  salesList:any[]= [];

  selectedSale:any = {}

  paymentAmount: number;

  toBePayed: number;

  searchForSale() {
    let queryString = `?`;
    let dateString = ``;
    let clientString = ``;
    let noteString = ``;

    if (this.queryObj.date && String(this.queryObj.date).length > 0) {
      let date = new Date(this.queryObj.date).toLocaleDateString();
      let formatDate = date.split('/');
      let sentDate = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`
      dateString = `date=${sentDate}`
      queryString = queryString.concat(dateString);
      queryString = queryString.concat('&');
    }

    if (this.queryObj.client && this.queryObj.client.length > 0) {
      clientString = `client=${this.queryObj.client}`
      queryString = queryString.concat(clientString);
      queryString = queryString.concat('&');
    }

    if (this.queryObj.noteId && this.queryObj.noteId.length > 0) {
      noteString = `id=${this.queryObj.noteId}`
      queryString = queryString.concat(noteString);
      queryString = queryString.concat('&');
    }
    
    this.notesService.searchNote(queryString).subscribe(response => {
          this.salesList = [];
          if(response['ok'] == true){
              this.salesList = response['success'];
          }
    },error => {
        
    });

    
  }

  openSale(sale){
    this.selectedSale = sale;
    this.openModal();
    this.findPayments();
  }

  findPayments() {
    this.paymentsService.getPaymentsByNote(this.selectedSale._id).subscribe({
      next: ((response: any[]) => {
        this.foundPayments = response;
      })
    })
  }

  deletePayment(id: string) {
   this.paymentsService.deletePayment(id).subscribe({
    next: (response => {
      this.getSpecificNote();
    })
   });
  }

  openModalPayment(){
    this.modalPayment.show();
    this.calculateRemainingPayment();
  }

  closeModalPayment(){
    this.modalPayment.hide();
  }

  addPayment(){
   console.log(this.selectedSale);
    const payload: Payment = {
      amount: Number(this.paymentAmount),
      note: this.selectedSale._id
    }
    this.paymentsService.createPayment(payload).subscribe({
      next: (response) => {
        this.getSpecificNote();
      }
    })
  }

  getSpecificNote() {
    this.notesService.getNoteById(this.selectedSale._id).subscribe({
      next: (response => {
        if(response['ok'] == true) {
          this.selectedSale = response['success'];
          this.searchForSale();
          this.findPayments();
          this.modalPayment.hide();
          this.calculateRemainingPayment();
          this.resetData();
        }
      })
    });
  }

  editSale() {
    this.router.navigateByUrl(`/sales/${this.selectedSale._id}`);
  }

  resetData() {
    this.paymentAmount = null;
  }

  printSale() {
    this.noteGenerationService.generateAndPrintPdf(this.selectedSale);
  }

  printProductionOrder() {
    this.noteGenerationService.generateOrderService(this.selectedSale);
  }

  openModal(){
    this.autoShownModal.show();
  }

  closeModal(){
    this.autoShownModal.hide();
  }

  calculateRemainingPayment(){
    this.toBePayed = this.selectedSale.totalSalePrice - this.selectedSale.amountPayed;
  }

  reCalculateRemainingPayment(){
    this.calculateRemainingPayment();
    this.toBePayed -= this.paymentAmount;
  }

}
