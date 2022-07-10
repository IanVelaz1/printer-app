import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalService } from '../../services/modals/modal.service';
import { NotesService } from '../../services/notes/notes.service';


@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.css']
})
export class SellFormComponent implements OnInit {

  modalRef: BsModalRef;

  @ViewChild('modal') autoShownModal: ModalDirective;
  @ViewChild('modalSale') modalSale: ModalDirective;


  saleItem: any = {
    client: '',
    items: [],
    totalSalePrice: 0,
    noteDate: undefined,
    formError: false,
    amountPayed: 0,
    status: ''
  }

  clientsResults: any[] = [];

  formObject: any[] = [];

  saleDifference: number;

  constructor(private modalService: BsModalService,
    private modalLoadingService: ModalService, private notesService: NotesService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.openAskModal();
  }

  openAskModal() {
    this.autoShownModal.show();
  }

  addPrintingProduct() {
    this.formObject.push({
      quantity: undefined,
      length: undefined,
      height: undefined,
      totalMeterSquares: undefined,
      unitPrice: undefined,
      unitTotalPrice: undefined,
      observations: '',
      fileName: '',
      totalItemPrice: 0,
      formError: false,
      isPrintingItem: true,
      adjustment:0
    });
    this.autoShownModal.hide();
  }

  addPromotionalProduct() {
    this.formObject.push({
      quantity: undefined,
      length: '',
      height: '',
      totalMeterSquares: undefined,
      unitPrice: undefined,
      unitTotalPrice: undefined,
      observations: '',
      fileName: '',
      totalItemPrice: 0,
      formError: false,
      isPrintingItem: false,
      adjustment: 0
    });
    this.autoShownModal.hide();

  }

  calculateSize(index) {
    if (this.formObject[index].length != undefined && this.formObject[index].height != undefined) {
      this.formObject[index].totalMeterSquares = this.formObject[index].length * this.formObject[index].height;
      if (this.formObject[index].unitPrice != undefined) {
        this.calculatePiecePrice(index);
        this.calculateTotalItemPrice(index);
      }
    }
  }

  calculatePiecePrice(index) {
    if (this.formObject[index].totalMeterSquares != undefined) {
      this.formObject[index].unitTotalPrice = this.formObject[index].totalMeterSquares * this.formObject[index].unitPrice;
      this.calculateTotalItemPrice(index);
    }
  }

  calculateTotalItemPrice(index) {
    if (this.formObject[index].quantity != undefined && this.formObject[index].unitPrice != undefined && this.formObject[index].length != undefined && this.formObject[index].height != undefined) {
      this.formObject[index].totalItemPrice = this.formObject[index].unitTotalPrice * this.formObject[index].quantity;
      if(this.formObject[index].adjustment && Number(this.formObject[index].adjustment)  >= 0){
        this.formObject[index].totalItemPrice += Number(this.formObject[index].adjustment);
      }
    }
  }

  validateFormFields() {
    let arrValidations = [];
    for (const obj of this.formObject) {
      if (obj.quantity != undefined && obj.length != undefined && obj.height != undefined && obj.unitPrice != undefined && obj.fileName != '') {
        obj.formError = false;
        debugger
        arrValidations.push(true);
      } else {
        obj.formError = true;
        debugger
        break;
      }
    }
    return arrValidations.length;
  }

  validateMainData() {
    if (this.saleItem.client != '' && this.saleItem.noteDate != undefined) {
      this.saleItem.formError = false;
      return true
    }
    this.saleItem.formError = true;
    return false;
  }

  calculateTotals() {
    let total = 0;
    for (const item of this.formObject) {
      total += item.totalItemPrice;
    }
    return total;
    debugger
  }

  calculateItemPrice(index) {
    if (this.formObject[index].quantity != undefined && this.formObject[index].unitPrice != undefined) {
      this.formObject[index].totalItemPrice = this.formObject[index].quantity * this.formObject[index].unitPrice;
      if(this.formObject[index].adjustment && Number(this.formObject[index].adjustment)  >= 0){
        this.formObject[index].totalItemPrice += Number(this.formObject[index].adjustment);
      }
    }
  }

  saveOrder() {
    let size = this.validateFormFields()
    if (size === this.formObject.length && this.validateMainData()) {
      this.saleItem.totalSalePrice = this.calculateTotals();
      this.saleItem.amountPayed = this.saleItem.totalSalePrice;
      this.modalSale.show();
      this.saleItem.items = this.formObject;
    }
  }


  endOrder() {
    let notificationObj = {};
    this.modalLoadingService.launchModalService(true);
    this.modalSale.hide();
    if(this.saleItem.amountPayed < this.saleItem.totalSalePrice){
      this.saleItem.status = 'Por pagar'
    }else{
      this.saleItem.status = 'Pagado'
    }

    this.notesService.saveNote(this.saleItem).subscribe(response => {
      location.reload();
    }, (error => {
      
    }));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  hideModal() {
    this.autoShownModal.hide();
    debugger
  }

  selectedDate(event) {
    debugger
  }

  removeSale(index) {
    this.formObject.splice(index, 1);
  }

  searchClient() {

    if(this.saleItem.client.length === 0){
      this.clientsResults = [];
    }

    let timeout = setTimeout(() => {
        this.notesService.searchForClient(this.saleItem.client).subscribe(response => {
          if (response['ok'] && response['ok'] == true) {
            this.clientsResults = response['success'];
          }
        });
        clearInterval(timeout);
    }, 500);

  }

  selectClient(client){
    this.saleItem.client = client.name;
    this.clientsResults = [];
  }


  comparePrice(){
    if(this.saleItem.totalSalePrice > this.saleItem.amountPayed){
      this.saleDifference = this.saleItem.totalSalePrice - this.saleItem.amountPayed;
    }
  }

  clearClientList(){
    this.clientsResults = [];
  }

}
