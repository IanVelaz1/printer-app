import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-non-payed-notes',
  templateUrl: './non-payed-notes.component.html',
  styleUrls: ['./non-payed-notes.component.css']
})
export class NonPayedNotesComponent implements OnInit {

  @Input() nonPayedNotes: any[] = [];

  displayedColumns: string[] = ['date', 'client', 'status', 'amount', 'amountPayed', 'remainingAmount'];

  constructor() { }

  ngOnInit(): void {
  }

}
