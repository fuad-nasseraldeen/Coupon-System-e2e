import { Component, OnInit } from '@angular/core';
import * as M from '../../models/app.models';
import { DataService } from 'src/app/data.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/services/cart.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ok } from 'assert';


@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {

  coupons : M.CouponForm[] = [];
  totalPrice : number = 0;
  numberOfProducts : number = 0;
  showSpinner : boolean = false ;
  inboundClick : boolean = true;
  outboundClick : boolean = true;
  profile : M.customerProfile;
  arrayOfCartItems : M.CouponForm[];

  constructor(private dataService : DataService , private customerService : CustomerService, private cartService : CartService) { }

  ngOnInit() {
    this.initItemsInCart();
    this.initTotalPrice();
    this.initNumberOfProducts();
   // this.getProfile()
  }

  getProfile(){
    this.initProfile()
    this.customerService.getProfile().subscribe((response : any ) =>{
      this.profile = response      
    })
  }

  initProfile(){
    this.profile = {
      customerName : null,
      id : null,
      password : null
    }
  }

  initItemsInCart(){
    this.coupons = JSON.parse(sessionStorage.getItem('Cart'))
  }

  initTotalPrice(){
      if( this.coupons && this.coupons.length > 0){
      this.totalPrice = 0;
      this.coupons.forEach(coupon => {
        this.totalPrice = coupon.price + this.totalPrice;     
      });
     }
    }

    initNumberOfProducts(){
     this.numberOfProducts = this.coupons.length;
    }

    buyCoupons(){
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;

      this.coupons.forEach(coupon => {
        this.customerService.purchaseCoupon(coupon.id).subscribe(
          (response) => {
              this.deleteItemFromCart(coupon)
    } , 
    (err) =>  Swal.fire('Bought Failed!', 'Something went wrong, Please try again ', 'error') 
    );
  })
  Swal.fire('Bought Coupons Successfully!' , '' , 'success')
  this.inboundClick = true;
     this.outboundClick = true;
} , 3000 );
}

deleteItemFromCart(item){

  const index: number = this.coupons.indexOf(item);      
  this.sendValueIntoService(this.coupons.indexOf(item));

    if (index !== -1) {
     this.coupons.splice(index, 1);
     this.totalPrice = this.totalPrice - item.price;
     this.numberOfProducts = this.numberOfProducts - 1;
 }
     this.cartService.deleteItemFromCart(item);
     this.dataService.transferDataFromHome(item)

}

sendValueIntoService(value: number) {
  this.cartService.setIndex(value);
}


}
    