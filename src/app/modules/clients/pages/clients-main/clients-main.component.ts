import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-clients-main',
  templateUrl: './clients-main.component.html',
  styleUrls: ['./clients-main.component.css']
})
export class ClientsMainComponent implements OnInit {

  mainForm: FormGroup;

  filters: any = {};
  limit = 20;
  index = 0;

  sizeOptions = [20, 50, 100];

  foundClients: any[] = [];

  displayedColumns: string[] = ['name', 'email'];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.queryClients();
  }

  initForm() {
    this.mainForm = this.fb.group({
      email: [null],
      name: [null]
    })
  }

  queryClients() {
    const queryObj = {
      ...this.filters,
      limit: this.limit,
      index: this.index
    }
    this.clientService.queryClients(queryObj).subscribe({
      next: (response => {
        this.foundClients = response['data'];
      })
    })
  }

  changedPaginator(event) {
    this.limit = event.pageSize;
    this.index = event.pageIndex;
    this.queryClients();
  }

  search() {
    this.filters = this.mainForm.value;
    this.queryClients();
  }

  createClient() {
    this.router.navigateByUrl('/clients/createClient');
  }

  navigateToClient(client) {
    this.router.navigateByUrl(`/clients/editClient/${client._id}`);
  }

}
