import { Injectable } from '@angular/core';
import  * as M from '../models/app.models';
import { Observable, Subject } from 'rxjs';
import { getMatFormFieldMissingControlError } from '@angular/material';
import { DataService } from '../data.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemsSession : M.CouponForm[] = [];
  sizeOfCart : number;
  homeCouponsArray : M.ICoupon[] = [];
  indexOf : number;
  totalAmount : number = 0;

  constructor(private dataService : DataService) { }

  addToCart(data : M.CouponForm) {
      this.cartItemsSession = this.getItemsFromSession();
      this.cartItemsSession.push(data);  
      this.dataService.addDataToLocalStorage('Cart' , this.getItems());
  }

  getItems() {
    return this.cartItemsSession;
  }
  
  getTotalPrice() : number{
    this.getItems().forEach(coupon => {
      this.totalAmount = coupon.price + this.totalAmount;   
      console.log(this.totalAmount);
    });
    console.log(this.totalAmount);
    return this.totalAmount;
  }

  getItemsFromSession (){
    return JSON.parse(sessionStorage.getItem("Cart"))
  }

  clearCart() {
    this.cartItemsSession = [];
    return this.cartItemsSession;
  }

  getSize() {
    return this.cartItemsSession.length;
}

deleteItemFromCart(item){

  this.cartItemsSession = this.getItemsFromSession();
     this.cartItemsSession.splice(this.indexOf, 1);
   this.dataService.addDataToLocalStorage('Cart' , this.getItems());
    }

    setIndex(data : number){
       this.indexOf = data;
    }

    addCouponToAvailables(coupon){
      this.dataService.homeArray.subscribe(data => {
         coupon = data;
         this.homeCouponsArray.push(coupon);
        })
  }


}
