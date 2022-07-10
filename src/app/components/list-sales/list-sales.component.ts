import { Component, OnInit, ViewChild } from '@angular/core';
import {NotesService} from '../../services/notes/notes.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})
export class ListSalesComponent implements OnInit {

  @ViewChild('modal', { static: false }) autoShownModal: ModalDirective;
  @ViewChild('modalPayment', { static: false }) modalPayment: ModalDirective;
  constructor(private notesService:NotesService) { }

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
    debugger
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
   this.selectedSale.amountPayed += this.paymentAmount
   if(this.selectedSale.amountPayed === this.selectedSale.totalSalePrice){
    this.selectedSale.status = 'Pagado';
  }
   debugger
   this.notesService.editNote(this.selectedSale,this.selectedSale._id).subscribe(response=>{
    debugger  
    if(response['ok'] == true){
        
        this.closeModalPayment();
      }
   });
   debugger
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
