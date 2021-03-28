import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import  * as M from '../models/app.models';
import { DataService } from '../data.service';
import { MatDialogRef } from '@angular/material';
import { PopupCompanyComponent } from '../popup-company/popup-company.component';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-popup-coupon',
  templateUrl: './popup-coupon.component.html',
  styleUrls: ['./popup-coupon.component.css']
})
export class PopupCouponComponent implements OnInit {

  message : string;
  couponData : M.CouponForm;

  showSpinner : boolean = false ;
  inboundClick : boolean = true;
  outboundClick : boolean = true;

  constructor(private dataService : DataService , private companyService : CompanyService,
    private dialogRef : MatDialogRef<PopupCompanyComponent>,
    private router : Router) { }

  ngOnInit() {
    this.initCouponData();
    this.dataService.newDataSubject.subscribe(
      data => this.couponData = data
    )
  }

  initCouponData(){
  this.couponData = {
    id : null,
    amount : null, 
    image : null, 
    message : null,
    startDate:null,
    endDate:null,
    price : null,
    title : null,
    type : null
  }
}

updateCoupon(){
  this.couponData = {
    id : this.couponData.id,
    amount : this.couponData.amount,
    image : this.couponData.image,
    startDate: this.couponData.startDate,
    endDate: this.couponData.endDate,
    message : this.couponData.message,
    price : this.couponData.price,
    title : this.couponData.title,
    type : this.couponData.type
  }
}



onSave(){
  this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.updateCoupon();
     this.companyService.updateCoupon(this.couponData , this.couponData.id).subscribe(
       (param) => {
        console.log(this.couponData)

      Swal.fire('Update Successfully!' , '' +  this.couponData.title  , 'success')
      this.router.navigate(['/company/coupons']);
      console.log(param);
     } , 
     (err) =>  Swal.fire('Update Failed!', 'Company Name is taken or invalid, please try again ', 'error')
     )
     this.inboundClick = true;
     this.outboundClick = true;
     this.onCancel();
    } , 3000 );
 }

 onCancel(){
 this.dialogRef.close();
 }



}
