import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayedNotesComponent } from './payed-notes.component';

describe('PayedNotesComponent', () => {
  let component: PayedNotesComponent;
  let fixture: ComponentFixture<PayedNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayedNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
