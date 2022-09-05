import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-amounts-owed-by-customer',
  templateUrl: './amounts-owed-by-customer.component.html',
  styleUrls: ['./amounts-owed-by-customer.component.css']
})
export class AmountsOwedByCustomerComponent implements OnInit {

  @Input() amountsOwedByCustomer: any[] = [];

  displayedColumns: string[] = ['client', 'amountToBePayed'];

  constructor() { }

  ngOnInit(): void {
  }

}
