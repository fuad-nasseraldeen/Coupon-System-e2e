import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './customer/home/home.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {SignupComponent} from './signup/signup.component';
import { AdminAuthGuard } from './guards/admin-auth-guard.guard';
import { CompanyComponent } from './company/company.component';
import { CompanyAuthGuard } from './guards/company-auth-guard.guard';
import { CustomerAuthGuard } from './guards/customer-auth-guard.guard';
import { CustomerComponent } from './customer/customer.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { UpdateCustomerProfileComponent } from './customer/update-customer-profile/update-customer-profile.component';
import { CustomerCartComponent } from './customer/customer-cart/customer-cart.component';
import { CustomerCouponsComponent } from './customer/customer-coupons/customer-coupons.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { CompaniesManagementComponent } from './admin/companies-management/companies-management.component';
import { UpdateAdminComponent } from './admin/update-admin/update-admin.component';
import { CreateCompanyComponent } from './admin/create-company/create-company.component';
import { CustomersManagementComponent } from './admin/customers-management/customers-management.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { CouponsManagementComponent } from './company/coupons-management/coupons-management.component';
import { UpdateCompanyComponent } from './company/update-company/update-company.component';
import { AddCouponComponent } from './company/add-coupon/add-coupon.component';
import { ContactComponent } from './contact/contact.component';
import { Home2Component } from './home2/home2.component';


// import {AuthGuard} from "./components/auth/auth.guard";


const routes : Routes = [
  {path: '' , component : Home2Component},
  {path: 'home2' , component : Home2Component},
  {path: 'login' , component: LoginComponent},
  {path: 'contact' , component: ContactComponent},
  {path: 'register', component: SignupComponent},
  {path: 'admin' , component : AdminComponent, canActivate:[AdminAuthGuard],
  children:[
    {path: '', redirectTo : '/profile', pathMatch : 'full' },
   {path: 'profile' , component : AdminProfileComponent},
   {path: 'update' , component : UpdateAdminComponent},
   {path: 'createcompany' , component : CreateCompanyComponent},
   {path: 'companies' , component : CompaniesManagementComponent},
   {path: 'customers' , component : CustomersManagementComponent}
  ]
},

  {path: 'company' , component : CompanyComponent, canActivate:[CompanyAuthGuard], 
  children:[
    {path: 'home2', redirectTo : '/profile', pathMatch : 'full' },
    {path: 'profile' , component : CompanyProfileComponent},
    {path: 'update' , component : UpdateCompanyComponent},
    {path: 'addcoupon' , component : AddCouponComponent},
    {path: 'coupons' , component : CouponsManagementComponent},
   ]
  },
  {path: 'customer' , component : CustomerComponent, canActivate:[CustomerAuthGuard],
  children:[
    {path: 'home2', redirectTo : '/profile', pathMatch : 'full' },
   {path: 'profile', component : CustomerProfileComponent},
   {path: 'update', component : UpdateCustomerProfileComponent},
   {path: 'cart', component : CustomerCartComponent},
   {path: 'coupons', component : CustomerCouponsComponent},
   {path: 'home' , component: HomeComponent}
  ]
},
  {path: '**' , redirectTo: 'home2'} 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

