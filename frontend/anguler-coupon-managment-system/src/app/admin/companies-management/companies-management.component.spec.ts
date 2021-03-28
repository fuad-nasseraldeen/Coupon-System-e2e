import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesManagementComponent } from './companies-management.component';

describe('CompaniesManagementComponent', () => {
  let component: CompaniesManagementComponent;
  let fixture: ComponentFixture<CompaniesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
