import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payed-notes',
  templateUrl: './payed-notes.component.html',
  styleUrls: ['./payed-notes.component.css']
})
export class PayedNotesComponent implements OnInit {

  @Input() payedNotes: any[] = [];

  displayedColumns: string[] = ['date', 'client', 'status', 'amountPayed'];

  constructor() { }

  ngOnInit(): void {
  }

}
