import { Component, OnInit , Input ,Output , EventEmitter} from '@angular/core';
import  * as M from '../../models/app.models';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
import { MatDialog , MatDialogConfig } from '@angular/material';
import { CustomerComponent } from 'src/app/customer/customer.component';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { PopupCustomerComponent } from 'src/app/popup-customer/popup-customer.component';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-customers-management',
  templateUrl: './customers-management.component.html',
  styleUrls: ['./customers-management.component.css']
})
export class CustomersManagementComponent implements OnInit {

  customer : M.Customer[];
  customerData : M.Customer;

  constructor(private adminService : AdminService , private dataService:DataService ,  public dialog : MatDialog ) { }

  ngOnInit() {
    this.initCustomers();
  }

  initCustomers(){
    this.adminService.getAllCustomers().subscribe((response : any) =>{
      this.customer = response;
    }
  )
}

deleteCustomer(customerId){
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

      this.adminService.deleteCustomer(customerId).subscribe((response : any) =>{
        console.log(response);
      }
    )
    
      Swal.fire(
        'Deleted!',
        'Customer has been deleted.',
        'success'
      )
      setTimeout(()=>{
        this.initCustomers();
      }, 1000)
    }
  })
 
}

updateCustomer(customerId){

this.adminService.getCustomer(customerId).subscribe((response : any) =>{
  this.customerData = response;
  console.log(this.customerData)
  this.dataService.addData(response);
})

 let dialogRef = this.dialog.open(PopupCustomerComponent, {
  width: '650px',
  height: '280px'
});
}


}
