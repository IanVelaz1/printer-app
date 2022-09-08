import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { NotesService } from 'src/app/services/notes/notes.service';
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  mainForm: FormGroup;

  clientsResults: any[] = [];

  statusOptions = [
    "Cualquiera",
    "Por pagar",
    "Pagado"
  ]

  filters: any = {}

  nonPayedNotes: any[] = [];
  payedNotes: any[] = [];
  amountsOwedByCustomer: any[] = [];

  totalOwed: number = 0;
  totalPayed: number = 0;
  totalAmountSale: number = 0;

  loading: boolean;

  constructor( 
    private fb: FormBuilder,
    private notesService: NotesService,
    private reportsService: ReportsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToMainFormControlChnges();
    this.subscribeToClientFormControl();
  }

  initForm() {
    this.mainForm = this.fb.group({
      initialDate: [ null, Validators.required ],
      finalDate: [null, Validators.required ],
      client: [null],
      status: [null]
    })
  }

  selectClient(client) {
    this.clientFormControl.setValue(client.name, {emitEvent: false});
    this.filters.client = client._id;
    this.clientsResults =  [];
  }

  subscribeToClientFormControl() {
    this.clientFormControl.valueChanges
    .pipe( debounceTime(300) )
    .subscribe({
      next: (value => {
        if(value?.length > 0) {
          this.searchClient();
        }
      })
    })
  }

  subscribeToMainFormControlChnges() {
    this.mainForm.valueChanges
    .pipe(
      debounceTime(300)
    ).subscribe({
      next: (value => {
        delete value.client;
        if(value.initialDate && value.finalDate) {
          value.initialDate = new Date(value.initialDate).toISOString();
          value.finalDate = new Date(value.finalDate).toISOString();
        }

        if(value.status === "Cualquiera") {
          delete this.filters.status;
        }
        this.filters = {...this.filters, ...value};
      })
    })
  }

  searchClient() {
    this.loading = true;
    if(this.clientFormControl.value?.length === 0){
      this.clientsResults = [];
    }

    let timeout = setTimeout(() => {
        this.notesService.searchForClient(this.clientFormControl.value).subscribe(response => {
          this.loading = false;
          if (response['ok'] && response['ok'] == true) {
            this.clientsResults = response['success'];
          }
        });
        clearInterval(timeout);
    }, 500);

  }

  resetFilters() {
    this.filters = {};
    this.mainForm.reset();
  }

  search() {
    this.loading = true;
    this.reportsService.queryReports(this.filters).subscribe({
      next: (response) => {
        this.loading = false;
        this.nonPayedNotes = response['nonPayedNotes'];
        this.payedNotes = response['payedNotes'];
        this.totalOwed = response['totalOwed'];
        this.totalPayed = response['totalAmountPayed'];
        this.totalAmountSale = response['totalAmountSale'];
        this.amountsOwedByCustomer = response['amountsOwedByCustomer']
      }
    })
  }

  get clientFormControl(): FormControl {
    return this.mainForm.get('client') as FormControl;
  }

  get statusFormControl(): FormControl {
    return this.mainForm.get('status') as FormControl;
  }

}
