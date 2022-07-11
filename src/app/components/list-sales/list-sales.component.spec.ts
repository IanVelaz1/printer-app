import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListSalesComponent } from './list-sales.component';

describe('ListSalesComponent', () => {
  let component: ListSalesComponent;
  let fixture: ComponentFixture<ListSalesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
