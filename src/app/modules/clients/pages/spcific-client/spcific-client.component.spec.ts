import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpcificClientComponent } from './spcific-client.component';

describe('SpcificClientComponent', () => {
  let component: SpcificClientComponent;
  let fixture: ComponentFixture<SpcificClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpcificClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpcificClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
