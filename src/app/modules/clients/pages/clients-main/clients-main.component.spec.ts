import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsMainComponent } from './clients-main.component';

describe('ClientsMainComponent', () => {
  let component: ClientsMainComponent;
  let fixture: ComponentFixture<ClientsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
