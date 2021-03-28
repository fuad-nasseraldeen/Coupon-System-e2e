import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsManagementComponent } from './coupons-management.component';

describe('CouponsManagementComponent', () => {
  let component: CouponsManagementComponent;
  let fixture: ComponentFixture<CouponsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
