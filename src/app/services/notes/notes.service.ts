import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    
  }

  private setHeaders() {
    let token = JSON.parse(localStorage.getItem('authData')).token;
    this.headers = new HttpHeaders({
      'token': token
    });
  }

  saveNote(data) {
    this.setHeaders();
    return this.http.post(environment.SERVICIOS_GUARDAR_VENTA, data, { headers: this.headers });
  }

  searchForClient(clientName: string) {
    this.setHeaders();
    return this.http.get(`${environment.SERVICIOS_BUSCAR_CLIENTE}/${clientName}`, { headers: this.headers });
  }

  searchNote(queryString: string) {
    this.setHeaders();
    return this.http.get(`${environment.SERVICIOS_BUSCA_VENTA}${queryString}`, { headers: this.headers });
  }

  editNote(note, id:string) {
    this.setHeaders();
    return this.http.put(`${environment.SERVICIOS_GUARDAR_VENTA}/${id}`,note,{headers:this.headers});
  }

  getNoteById(id: string) {
    this.setHeaders();
    return this.http.get(`${environment.SERVICIOS_GUARDAR_VENTA}/${id}`, { headers: this.headers });
  }

  getReports() {
    this.setHeaders();
    return this.http.get(`${environment.SERVICIOS_REPORTES}`);
  }

  copyNote(originalId: string) {
    this.setHeaders();
    return this.http.post(`${environment.NOTES_V2}/${originalId}`, {});
  }

}
