import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import {AlertModule} from 'ngx-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './customer/home/home.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';

import { MatFormFieldModule } from '@angular/material/form-field';

import {FooterComponent} from './footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AdminAuthGuard } from './guards/admin-auth-guard.guard';
import { CompanyComponent } from './company/company.component';
import { CompanyAuthGuard } from './guards/company-auth-guard.guard';
import { CustomerAuthGuard } from './guards/customer-auth-guard.guard';
import { CustomerComponent } from './customer/customer.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { UpdateCustomerProfileComponent } from './customer/update-customer-profile/update-customer-profile.component';
import { CustomerCartComponent } from './customer/customer-cart/customer-cart.component';
import { CustomerCouponsComponent } from './customer/customer-coupons/customer-coupons.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { UpdateAdminComponent } from './admin/update-admin/update-admin.component';
import { CreateCompanyComponent } from './admin/create-company/create-company.component';
import { CompaniesManagementComponent } from './admin/companies-management/companies-management.component';
import { CustomersManagementComponent } from './admin/customers-management/customers-management.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { UpdateCompanyComponent } from './company/update-company/update-company.component';
import { CouponsManagementComponent } from './company/coupons-management/coupons-management.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupCustomerComponent } from './popup-customer/popup-customer.component';
import { DataService } from './data.service';
import { PopupCompanyComponent } from './popup-company/popup-company.component';
import { AdminService } from './services/admin.service';
import { CompanyService } from './services/company.service';
import { PopupCouponComponent } from './popup-coupon/popup-coupon.component';
import {NgbModule, NgbButtonsModule, NgbToastModule, NgbCollapseModule, NgbDropdownMenu, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { AddCouponComponent } from './company/add-coupon/add-coupon.component';
import { ContactComponent } from './contact/contact.component';
import { Home2Component } from './home2/home2.component';




@NgModule({

  declarations: [
    PopupCustomerComponent,
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    NavbarComponent,
    FooterComponent,
    CompanyComponent,
    CustomerComponent,
    AddCouponComponent,
    CustomerProfileComponent,
    UpdateCustomerProfileComponent,
    CustomerCartComponent,
    CustomerCouponsComponent,
    AdminProfileComponent,
    UpdateAdminComponent,
    CreateCompanyComponent,
    CompaniesManagementComponent,
    CustomersManagementComponent,
    CompanyProfileComponent,
    UpdateCompanyComponent,
    CouponsManagementComponent,
    PopupCompanyComponent,
    PopupCouponComponent,
    ContactComponent,
    Home2Component
  ],
  imports: [
    MatDialogModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatFormFieldModule,
    
    MatDatepickerModule,

    MatNativeDateModule,

    MatFormFieldModule,
    FormsModule,
    AlertModule.forRoot(),
    BrowserModule,
    NgbModule,
    NgbButtonsModule,
    NgbToastModule,
    NgbCollapseModule,
    NgbDropdownModule,
    AppRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot({
    
    }),

    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ScrollingModule
  ],
  providers: [CookieService, AdminAuthGuard , CompanyAuthGuard, CustomerAuthGuard , DataService , CompanyService , AdminService],
  bootstrap: [LayoutComponent],
  entryComponents:[PopupCustomerComponent, PopupCompanyComponent, PopupCouponComponent]
})
export class AppModule { }
