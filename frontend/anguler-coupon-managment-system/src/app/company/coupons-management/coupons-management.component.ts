import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import  * as M from '../../models/app.models';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/data.service';
import { MatDialog } from '@angular/material';
import { PopupCouponComponent } from 'src/app/popup-coupon/popup-coupon.component';

@Component({
  selector: 'app-coupons-management',
  templateUrl: './coupons-management.component.html',
  styleUrls: ['./coupons-management.component.css']
})
export class CouponsManagementComponent implements OnInit {

  constructor(private companyService : CompanyService, private dataService : DataService , public dialog : MatDialog) { }

  coupons : M.ICoupon[];
  couponData : M.CouponForm;

  ngOnInit() {
    // this.initCouponData();
    this.initCoupons();
  }

  initCoupons(){
    this.companyService.getAllCompanyCoupons().subscribe((response : any) =>{
      this.coupons = response;
    }
  )
}

deleteCoupon(couponId){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {

      this.companyService.removeCoupon(couponId).subscribe((response : any) =>{
        console.log(response);
      }
    )
    
      Swal.fire(
        'Deleted!',
        'Company has been deleted.',
        'success'
      )
      setTimeout(()=>{
        this.initCoupons();
      }, 1000)
    }
  })
}


updateCoupon(couponId){
  
  this.companyService.getCoupon(couponId).subscribe((response : any) =>{
    this.couponData = response;
    console.log(this.couponData)
    this.dataService.addData(response);
    
  })
  
   let dialogRef = this.dialog.open(PopupCouponComponent, {
    width: '700px',
    height: '430px'
  });
  }


}
