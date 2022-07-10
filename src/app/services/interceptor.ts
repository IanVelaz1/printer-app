import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ModalService } from '../services/modals/modal.service';
import { LoginService } from './login.service';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

    constructor(private modalService: ModalService, private loginService: LoginService) {

    }

    intercept(
        request: HttpRequest<any>, next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let notificationObj = {};
        console.log(request);
           if (!request.url.includes('/api/client')) {
            this.modalService.launchModalService(true);
           }

        return next.handle(request).pipe(
            map((event => {
                this.modalService.launchModalService(false);
                if (!request.url.includes('/api/client')) {

                    
                    debugger
                    notificationObj['type'] = 'success';
                    notificationObj['message'] = 'Solicitud procesada correctamente';
                    this.modalService.launchAlertService(notificationObj);

                }
                return event;
            })),
            catchError(error => {
                debugger
                this.modalService.launchModalService(false);
                if (!request.url.includes('/api/client')) {
                    if (error.status === 401) {
                        this.loginService.logout();
                        notificationObj['type'] = 'danger';
                        notificationObj['message'] = 'Su sesión ha expirado';
                        this.modalService.launchAlertService(notificationObj);
                    } {
                        notificationObj['type'] = 'danger';
                        notificationObj['message'] = 'error al procesar la solicitud';
                        this.modalService.launchAlertService(notificationObj);
                    }

                }


                return throwError(error);
            })
        );
    }
}