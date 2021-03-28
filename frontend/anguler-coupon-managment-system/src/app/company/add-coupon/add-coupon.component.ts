import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as M from '../../models/app.models';
import * as E from '../../models/app.enums';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

 
  showSpinner : boolean = false ;
  inboundClick : boolean = true;
  outboundClick : boolean = true;
  addCouponForm : M.CouponForm
  couponType = E.CouponType;
  options = [];
  title : string = "Coupon Type";

  constructor(private router : Router , private companyService : CompanyService ) { }

  ngOnInit() {
    this.initOptionsArray();
    this.initCouponForm();
   
  }

  initOptionsArray(){
    for (const key in this.couponType) {
      let item = {
        key:key,
        value:key.toUpperCase()
      }
      this.options.push(item);
    }
  }

  initCouponForm(){ 
    this.addCouponForm = {
      id : null,
      title :  null,
      amount: null,
       message: null,
       price : null,
       startDate: null,
       endDate : null,
       image : null,
       type : null
    }
  }


  submit(){
  
    this.showSpinner = true;
    setTimeout(()=>{
      this.showSpinner = false;
    this.companyService.addNewCoupon(this.addCouponForm) .subscribe((response:any) => {

      console.log(this.addCouponForm);

      Swal.fire('Added new Coupon Successfully!', ' ' +  this.addCouponForm.title  , 'success')
      this.router.navigate(['/company/coupons']);

    }, (err) =>   Swal.fire('Add Coupon Failed!', 'Please try again ' , 'error'))
    this.inboundClick = true;
    this.outboundClick = true;
  }, 2500)

  }



}
