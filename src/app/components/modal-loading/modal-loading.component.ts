import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {ModalService} from '../../services/modals/modal.service';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html',
  styleUrls: ['./modal-loading.component.css']
})
export class ModalLoadingComponent implements OnInit {

  @ViewChild('modalLoading') autoShownModal: ModalDirective;


  constructor(private modalService: ModalService) { }

  ngOnInit() {

    this.modalService.launchModalLoading.subscribe(modal => {
      if(modal === true){
        this.autoShownModal.show();
      }else{
        this.autoShownModal.hide();
      }
    });

  }

}
