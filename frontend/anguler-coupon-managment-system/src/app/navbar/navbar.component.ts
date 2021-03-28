import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LogoutService } from '../services/logout.service';
import { Router, Data } from '@angular/router';
import { CartService } from '../services/cart.service';
import { DataService } from '../data.service';
import * as M from '../models/app.models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService : AuthService , private logoutService : LogoutService , private router:Router, private cartService : CartService ,  private dataService : DataService
     ) { }

  public navbarCollapsed = false;
  numberOfItemsInCart : number = 0;
  totalAmount : number = 0;
  arrayOfCartItems : M.CouponForm[];


  ngOnInit() {

        if(this.cartService.getItemsFromSession() != null && this.cartService.getItemsFromSession().length > 0){
        this.numberOfItemsInCart = this.cartService.getItemsFromSession().length
        this.arrayOfCartItems = this.cartService.getItemsFromSession()
        }

        this.dataService.newDataSubject.subscribe((data:any) => {
        if(data != null){
        this.numberOfItemsInCart = data.length
        } else {
          this.numberOfItemsInCart = 0;
        }
        })
        
     this.dataService.newDataSubject.subscribe((data:any) => { 
       if(data != null){
        this.arrayOfCartItems = data
       } else {
         this.arrayOfCartItems = this.cartService.getItemsFromSession();
       }
     })

     this.getTotalAmountOfCartItems();

  }

  getTotalAmountOfCartItems(){
    if( this.arrayOfCartItems && this.arrayOfCartItems.length > 0){
    this.totalAmount = 0;
    this.arrayOfCartItems.forEach(coupon => {
      this.totalAmount = coupon.price + this.totalAmount;  
    });
   }
  }

  onCheckout(){
    this.router.navigate(['/customer/cart']);
  }

  

  ifAdminLoggedIn(){
   if(this.authService.adminLoggedIn()){
     return true;
   } else {
     return false;
   }
  }

  ifCompanyLoggedIn(){
    if(this.authService.companyLoggedIn()){
      return true;
    } 
  }

  ifCustomerLoggedIn(){
    if(this.authService.customerLoggedIn()){
      return true;
    } 
  }

  ifLoggedIn(){
    if(this.authService.ifThereIsSession()){
      return true;
    }    
  }

  sendValueIntoService(value: number) {
    this.cartService.setIndex(value);
  }

  deleteItemFromCart(item){

    const index: number = this.arrayOfCartItems.indexOf(item);      
    this.sendValueIntoService(this.arrayOfCartItems.indexOf(item));

      if (index !== -1) {
       this.arrayOfCartItems.splice(index, 1);
   }
       this.cartService.deleteItemFromCart(item);
       this.dataService.transferDataFromHome(item)

  }

  onLogout(){
    this.logoutService.logoutUser().subscribe((response) => {
      console.log("test1")
      sessionStorage.removeItem("Cookie");
      sessionStorage.removeItem("Role");
      sessionStorage.removeItem("Cart")
      console.log("test2")
      this.dataService.newDataSubject.next(null)
      this.cartService.clearCart();
      console.log("test3")
      this.router.navigate(['/login']);
      console.log( response   + '   response');
      }
   )}

 }

