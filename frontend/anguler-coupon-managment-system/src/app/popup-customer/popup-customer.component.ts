import { Component, OnInit } from '@angular/core';
import  * as M from '../models/app.models';
import { DataService } from '../data.service';
import { AdminService } from '../services/admin.service';
import { MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-customer',
  templateUrl: './popup-customer.component.html',
  styleUrls: ['./popup-customer.component.css']
})
export class PopupCustomerComponent implements OnInit {

  constructor(private dataService : DataService , private adminService : AdminService,
    private dialogRef : MatDialogRef<PopupCustomerComponent>,
    private router : Router) { }

  message : string;
  customerData : M.Customer;
  showSpinner : boolean = false ;
  inboundClick : boolean = true;
  outboundClick : boolean = true;

  initCustomerData(){
    this.customerData = {
      id : null,
      customerName : null,
      password : null
    }
  }

  updateCustomer(){
    this.customerData = {
      id : this.customerData.id,
      customerName : this.customerData.customerName,
      password : this.customerData.password
    }
  }

  ngOnInit() {
    this.initCustomerData();
     this.dataService.newDataSubject.subscribe(
       data => this.customerData = data
     )
  }

onSave(){
  this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.updateCustomer();
    

     this.adminService.updateCustomer(this.customerData).subscribe(
       (param) => {
      Swal.fire('Update Successfully!' , '' +  this.customerData.customerName  , 'success')
      this.router.navigate(['/admin/customers']);
      console.log(param);
     } , 
     (err) =>  Swal.fire('Update Failed!', 'Username is taken or invalid, please try again ', 'error')
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
