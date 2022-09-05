import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountsOwedByCustomerComponent } from './amounts-owed-by-customer.component';

describe('AmountsOwedByCustomerComponent', () => {
  let component: AmountsOwedByCustomerComponent;
  let fixture: ComponentFixture<AmountsOwedByCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountsOwedByCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountsOwedByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
