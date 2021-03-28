import { Injectable } from '@angular/core';
import { NetService } from './net/net.service';
import * as M from '../models/app.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  couponsFromServer : Observable<M.ICoupon[]>;
  couponFromSession : M.ICoupon[];
  
  constructor(private netService : NetService) {}

  getAllAvailableCoupons (): Observable <M.ICoupon[]> {
     return this.couponsFromServer = this.netService.getAllAvailableCoupons();
   }

   purchaseCoupon(couponId : number) : Observable<any>{
    return this.netService.purchaseCoupon(couponId);
  }

  getProfile() : Observable<M.Company>{
    return this.netService.getCustomerProfile();
  }
  
  getAllPurchasedCoupons() : Observable<M.Company>{
    return this.netService.getAllPurchasedCoupons();
  }

}
