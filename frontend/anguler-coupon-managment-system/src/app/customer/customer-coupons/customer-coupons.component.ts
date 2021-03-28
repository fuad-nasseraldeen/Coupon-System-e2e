import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import  * as M from '../../models/app.models';


@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html',
  styleUrls: ['./customer-coupons.component.css']
})
export class CustomerCouponsComponent implements OnInit {

  coupons : M.ICoupon[];

  constructor(private customerService : CustomerService) { }

  ngOnInit() {
    this.initCoupons()
  }

  initCoupons(){
    this.customerService.getAllPurchasedCoupons().subscribe((response : any) =>{
      this.coupons = response;
    }
  )
}

}
