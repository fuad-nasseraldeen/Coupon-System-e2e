import { Component, OnInit } from '@angular/core';
import * as M from '../../models/app.models';
import { CouponsService } from '../../services/coupons.service';
import { AuthService } from '../../services/auth.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../data.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public coupons : M.ICoupon[] = [];
  private onClickCheck : boolean = false;
  private couponFromSession : M.ICoupon[] = [];
  arrayOfCartItems : M.CouponForm[];

  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);


  constructor(private couponsService : CouponsService 
     , private authService : AuthService , config : NgbCarouselConfig
     , private customerService : CustomerService
     , private cartService : CartService
     , private dataService : DataService
     ) {  
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }  

  ngOnInit() {
    this.addCouponToAvailables()
    this.initCouponsFromSession();
    this.initAvailableCoupon();
    
    this.dataService.newDataSubject.subscribe((data:any) => { 
      if(data != null){
       this.arrayOfCartItems = data
      } else {
        this.arrayOfCartItems = this.cartService.getItemsFromSession();
      }
    })
  }



  initCouponsFromSession(){
    this.dataService.newDataSubject.subscribe((data:any) => { 
        this.couponFromSession = data
    })
  }

  initAvailableCoupon(){
    this.customerService.getAllAvailableCoupons().subscribe( 
      couponsAvailableFromServer =>  { 
        this.couponFromSession = this.cartService.getItemsFromSession();
        this.coupons = this.compareArrays(couponsAvailableFromServer ,this.couponFromSession)
      }) 
}

  addToCart(coupon){
    setTimeout(()=>{
    this.onClickCheck = true;
    this.cartService.addToCart(coupon)
    this.deleteCouponFromAvailables(coupon);    
  }, 200)
  }

  addCouponToAvailables(){
    this.dataService.homeArray.subscribe(data => {
       this.coupons.push(data);
      })
}

  deleteCouponFromAvailables(coupon){
    const index: number = this.coupons.indexOf(coupon);
    if (index !== -1) {
        this.coupons.splice(index, 1);
  }
}

compareArrays(array1 : M.ICoupon[] , array2 : M.ICoupon[]) : any{
  array2.forEach((item2) => {

    array1 = array1.filter((item1) => {
      //use JSON.stringify() to compare tow objects
      return JSON.stringify(item1) !== JSON.stringify(item2);
    })

   })
   return array1;
}


}
