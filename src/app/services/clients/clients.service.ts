import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  queryClients(query) {
    let httpParams = new HttpParams();
    
    if(query.index) {
      httpParams = httpParams.append('index', query.index);
    }
    
    if(query.limit) {
      httpParams = httpParams.append('limit', query.limit);
    }

    if(query.name) {
      httpParams = httpParams.append('name', query.name);
    }

    if(query.email) {
      httpParams = httpParams.append('email', query.email);
    }

    return this.httpClient.get(`${environment.CLIENTS_SERVICES}`, { params: httpParams });
  }

  createClient(client) {
    return this.httpClient.post(`${environment.CLIENTS_SERVICES}`, client);
  }
  
  querySpecificClient(id) {
    return this.httpClient.get(`${environment.CLIENTS_SERVICES}/${id}`);
  }

  editClient(id, client) {
    return this.httpClient.put(`${environment.CLIENTS_SERVICES}/${id}`, client);
  }
}
