import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-spcific-client',
  templateUrl: './spcific-client.component.html',
  styleUrls: ['./spcific-client.component.css']
})
export class SpcificClientComponent implements OnInit {

  mainForm: FormGroup;
  isEdit: boolean;
  clientId: string;

  panelOpenState: boolean = true;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe({
      next: (value => {
        if(value.id) {
          this.clientId = value.id;
          this.isEdit = true;
          this.querySpecificClient();
        }
      })
    })
  }

  initForm() {
    this.mainForm = this.fb.group({
      name: [null, Validators.required],
      email: [null],
      address: this.fb.group({
        address: [null],
        contact1: this.fb.group({
          name: [null],
          phone: [null]
        }),
        contact2: this.fb.group({
          name: [null],
          phone: [null]
        }),
        phone: [null]
      }),
      fiscalData: this.fb.group({
        fiscalAddress: [null],
        postalCode: [null],
        regime: [null],
        rfc: [null],
        socialReason: [null]
      })
    });
  }

  createClient() {
    const payload = {...this.mainForm.value}
    if(!this.isEdit) {
      this.clientService.createClient(payload).subscribe({
        next: (response => {
          if(response) {
            this.router.navigateByUrl(`clients/editClient/${response['_id']}`).then(() => {
              location.reload();
            });
          }
        })
      })
    } else {
      this.clientService.editClient(this.clientId, payload).subscribe({
        next: (response => {
          if(response) {
            location.reload();
          }
        })
      })
    }
    
  }

  querySpecificClient() {
    this.clientService.querySpecificClient(this.clientId).subscribe({
      next: (response => {
        this.mainForm.patchValue({...response});
      })
    })
  } 

}
