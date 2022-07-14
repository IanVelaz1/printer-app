import { Injectable, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
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
     this.launchModalAlert.emit(alertObj);
  }


}