import { Injectable } from '@angular/core';
import { NetService } from './net/net.service';
import  * as M from '../models/app.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private netService : NetService) { }

  addNewCoupon(AddCouponForm: M.CouponForm ): Observable <any> {
    return this.netService.addNewCoupon(AddCouponForm);
   }

   getAllCompanyCoupons() : Observable <M.ICoupon[]>{
    return this.netService.getAllCompanyCoupons();
   }

  removeCoupon(couponId : number) : Observable <M.ICoupon>{
    return  this.netService.removeCoupon(couponId);
  }

  updateCoupon(couponDetails : M.CouponForm , couponId : number) : Observable <M.ICoupon>{
    return  this.netService.updateCoupon(couponDetails , couponId);
  }
    
  getCoupon(couponId : number) : Observable<M.CouponForm>{
    return this.netService.getCoupon(couponId);
  }
  
}
