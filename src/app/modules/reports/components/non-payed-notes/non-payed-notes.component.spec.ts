import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonPayedNotesComponent } from './non-payed-notes.component';

describe('NonPayedNotesComponent', () => {
  let component: NonPayedNotesComponent;
  let fixture: ComponentFixture<NonPayedNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonPayedNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonPayedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
