import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCouponsComponent } from './customer-coupons.component';

describe('CustomerCouponsComponent', () => {
  let component: CustomerCouponsComponent;
  let fixture: ComponentFixture<CustomerCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
