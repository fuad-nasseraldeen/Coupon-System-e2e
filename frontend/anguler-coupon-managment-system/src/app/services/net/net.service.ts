import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as M from 'src/app/models/app.models';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { DataService } from 'src/app/data.service';


@Injectable({
  providedIn: 'root'
})
export class NetService {


  //BaseURL
  private BASE_URL = '/couponsystem'

  //PublicAPI
  private REGISTER_URL = this.BASE_URL+'/register';
  private CONTACT_URL = this.BASE_URL+'/contact';
  //LoginAPI
  private LOGIN_URL = this.BASE_URL+'/login'
  //LogoutAPI
  private LOGOUT_URL = this.BASE_URL+'/logout'
  
  //CustomerAPI
  private CUSTOMER_URL = this.BASE_URL+'/customer'
  private GET_CUSTOMER_PROFILE_URL = this.CUSTOMER_URL+"/getCustomerProfile";
  private GET_ALL_AVAILABLE_COUPONS_URL = this.CUSTOMER_URL+"/getAllAvailableCoupons";
  private GET_ALL_AVAILABLE_COUPONS_BY_TYPE_URL = this.CUSTOMER_URL+"/getAllAvailableCoupons/{couponType}"; 
  private GET_MY_PURCHASED_COUPONS_URL = this.CUSTOMER_URL+"/getAllPurchasedCoupons"
  private PURCHASE_COUPON = this.CUSTOMER_URL+"/purchaseCoupon/";

  //AdminAPI
  private ADMIN_URL = this.BASE_URL+'/admin'
  private ADD_COMPANY_URL = this.ADMIN_URL+'/createCompany'
  private GET_ALL_COMPANIES_URL = this.ADMIN_URL+'/getAllCompanies'
  private GET_ALL_CUSTOMERS_URL = this.ADMIN_URL+'/getAllCustomers'
  private DELETE_COMPANY = this.ADMIN_URL+'/removeCompany/'
  private DELETE_CUSTOMER = this.ADMIN_URL+'/removeCustomer/'
  private GET_CUSTOMER_BY_ID = this.ADMIN_URL+'/getCustomer/'
  private UPDATE_CUSTOMER_URL = this.ADMIN_URL+'/updateCustomer/'
  private GET_COMPANY_BY_ID = this.ADMIN_URL+'/getCompany/'
  private UPDATE_COMPANY_URL = this.ADMIN_URL+'/updateCompany/'

  //CompanyAPI 
  
  private COMPANY_URL = this.BASE_URL+'/company'
  private ADD_COUPON_URL = this.COMPANY_URL+'/addCoupon'
  private REMOVE_COUPON = this.COMPANY_URL+'/removeCoupon/'
  private UPDATE_COUPON = this.COMPANY_URL+'/updateCoupon/'
  private GET_COUPON_BY_ID = this.COMPANY_URL+'/getCoupon/'
  private GET_COMPANY_COUPONS_URL = this.COMPANY_URL+'/getAllCompanyCoupons';


  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private http: HttpClient, private cookieService : CookieService, private router : Router, private cartService : CartService , private dataService : DataService ) { 
  }

  //RegisterAPI
  registerUser(formDetails: M.SignupFormDetails): Observable<any> {
    return this.http.post(this.REGISTER_URL, formDetails, { headers: this.headers,   responseType: 'text' as 'json' , withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }


  //ContactAPI
  contact(formDetails: M.Contact): Observable<any> {
    return this.http.post(this.CONTACT_URL, formDetails, { headers: this.headers,   responseType: 'text' as 'json' , withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }

  //LoginAPI
   loginUser (formDetails : M.LoginFormDetails): Observable<any>{
     return this.http.post(this.LOGIN_URL , formDetails, { headers: this.headers, responseType: 'json', withCredentials : true , observe: "response" as 'body'})
     .pipe(catchError(err => this.handleError(err)));
    }
    //LogoutAPI
     logoutUser():Observable<any>{
       return this.http.get<any>(this.LOGOUT_URL, {headers : this.headers , responseType: 'text' as 'json' ,   withCredentials : true})
       .pipe(catchError(err => this.handleError(err)));
      }

   //Admin API

   //Add new Company
   addNewCompany(formDetails: M.CompanyFormDetails): Observable<any> {
    return this.http.post(this.ADD_COMPANY_URL , formDetails, { headers: this.headers,   responseType: 'text' as 'json' , withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }

  //Get all companies
  getAllCompanies(): Observable<M.CompanyFormDetails[]>{
    return this.http.get<M.CompanyFormDetails[]>(this.GET_ALL_COMPANIES_URL, {headers : this.headers , responseType: 'json',   withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }

   //Get all customers
   getAllCustomers(): Observable<M.Customer[]>{
    return this.http.get<M.Customer[]>(this.GET_ALL_CUSTOMERS_URL, {headers : this.headers , responseType: 'json',   withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }

  // Delete Company
  deleteCompany(companyId : number): Observable<any>{
    return this.http.delete<M.CompanyFormDetails>(this.DELETE_COMPANY+companyId, {headers : this.headers , responseType: 'text' as 'json' ,   withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }

   // Delete Customer
   deleteCustomer(customerId : number): Observable<any>{
    return this.http.delete<M.Customer>(this.DELETE_CUSTOMER+customerId, {headers : this.headers , responseType: 'json',   withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }

  // Get Customer by id
   getCustomer(customerId : number): Observable<M.Customer>{
    return this.http.get<M.Customer>(this.GET_CUSTOMER_BY_ID+customerId, {headers : this.headers , responseType: 'json',   withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }

   // Update Customer
   updateCustomer(customerDetails: M.Customer): Observable<any> {
    return this.http.post(this.UPDATE_CUSTOMER_URL , customerDetails, { headers: this.headers,   responseType: 'text' as 'json'  , withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }

    // Get Company by id
    getCompany(companyId : number): Observable<M.Company>{
      return this.http.get<M.Company>(this.GET_COMPANY_BY_ID+companyId, {headers : this.headers , responseType: 'json',   withCredentials : true})
      .pipe(catchError(err => this.handleError(err)));
    }
  
     // Update Company
     updateCompany(companyDetails: M.Company): Observable<any> {
      return this.http.post(this.UPDATE_COMPANY_URL , companyDetails, { headers: this.headers,   responseType:  'text' as 'json' , withCredentials : true})
      .pipe(catchError(err => this.handleError(err)));
    }



   // Company API

   //Company - Get all Company related coupons:
   getAllCompanyCoupons (): Observable<M.ICoupon[]>{
     return this.http.get<M.ICoupon[]>(this.GET_COMPANY_COUPONS_URL, { headers : this.headers ,responseType: 'json', withCredentials : true})
     .pipe(catchError(err => this.handleError(err)));
    }

   // Adding new Coupon
   addNewCoupon(newCouponDetails: M.CouponForm): Observable<any> {
    return this.http.post(this.ADD_COUPON_URL , newCouponDetails, { headers: this.headers,   responseType:  'text' as 'json' , withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }

  // Delete Coupon
     removeCoupon(couponId : number): Observable<any>{
      return this.http.delete<M.ICoupon>(this.REMOVE_COUPON+couponId, {headers : this.headers , responseType: 'json',   withCredentials : true})
      .pipe(catchError(err => this.handleError(err)));
    }

  // Update Coupon
  updateCoupon(couponDetails: M.CouponForm , couponId : number): Observable<any> {
    return this.http.post(this.UPDATE_COUPON+couponId,  couponDetails, { headers: this.headers,   responseType: 'text' as 'json' , withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }

    // Get Coupon by id
    getCoupon(couponId : number): Observable<M.CouponForm>{
      return this.http.get<M.CouponForm>(this.GET_COUPON_BY_ID+couponId, {headers : this.headers , responseType: 'json',   withCredentials : true})
      .pipe(catchError(err => this.handleError(err)));
    }




   // Customer API

   // Get All Available Coupons From Server
   getAllAvailableCoupons (): Observable<M.ICoupon[]>{
    return this.http.get<M.ICoupon[]>(this.GET_ALL_AVAILABLE_COUPONS_URL, { headers : this.headers ,responseType: 'json', withCredentials : true})
    .pipe(catchError(err => this.handleError(err)));
  }

  // PURCHASE_COUPON
  purchaseCoupon(couponId : number) : Observable<any>{
    return this.http.post(this.PURCHASE_COUPON+couponId , null ,{ headers: this.headers,  responseType: 'text' , withCredentials : true })
    .pipe(catchError(err => this.handleError(err)));
  }

  // GET_CUSTOMER_PROFILE_URL
  getCustomerProfile (): Observable<any>{
    return this.http.get<any>(this.GET_CUSTOMER_PROFILE_URL, { headers : this.headers ,responseType: 'json', withCredentials : true })
    .pipe(catchError(err => this.handleError(err)));
  }
 // GET_MY_PURCHASED_COUPONS_URL
 getAllPurchasedCoupons (): Observable<any>{
  return this.http.get<any>(this.GET_MY_PURCHASED_COUPONS_URL, { headers : this.headers ,responseType: 'json', withCredentials : true })
  .pipe(catchError(err => this.handleError(err)));
}
  
   private handleError(errorResponse : HttpErrorResponse) {
     if(errorResponse.error instanceof ErrorEvent){
       console.log('Client Side Error: ' , errorResponse.error.message);
       return throwError(errorResponse);
     }
      //  } else if (errorResponse.status == 401){

      //   sessionStorage.removeItem("Cookie");
      //   sessionStorage.removeItem("Role");
      //   sessionStorage.removeItem("Cart")
  
      //   this.dataService.newDataSubject.next(null)
      //   this.cartService.clearCart();


      //   this.router.navigate(['/login']);
      //   console.error('Unauthorized!' , errorResponse);
      //   return throwError(errorResponse);
      //  }
       else {
         console.error('Server Side Error ' , errorResponse);
         return throwError(errorResponse);
       }
       return throwError(errorResponse);
   }



 

}
