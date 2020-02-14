import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

    @Output() launchModalLoading: EventEmitter<any> = new EventEmitter();
    @Output() launchModalAlert: EventEmitter<any> = new EventEmitter();

  constructor() { }


  launchModalService(launch = false){
      this.launchModalLoading.emit(launch);
  }


  launchAlertService(alertObj){
    debugger
     this.launchModalAlert.emit(alertObj);
  }


}