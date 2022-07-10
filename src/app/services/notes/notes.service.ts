import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = JSON.parse(localStorage.getItem('authData')).token;
    this.headers = new HttpHeaders({
      'token': token
    });
  }


  saveNote(data) {
    return this.http.post(environment.SERVICIOS_GUARDAR_VENTA, data, { headers: this.headers });
  }


  searchForClient(clientName: string) {
    return this.http.get(`${environment.SERVICIOS_BUSCAR_CLIENTE}/${clientName}`, { headers: this.headers });
  }


  searchNote(queryString: string) {
    return this.http.get(`${environment.SERVICIOS_BUSCA_VENTA}${queryString}`, { headers: this.headers });
  }

  editNote(note, id:string) {
    return this.http.put(`${environment.SERVICIOS_GUARDAR_VENTA}/${id}`,note,{headers:this.headers});
  }

  getReports() {
    return this.http.get(`${environment.SERVICIOS_REPORTES}`);
  }

}
