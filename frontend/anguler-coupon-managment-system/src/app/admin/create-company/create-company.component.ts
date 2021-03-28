import { Component, OnInit } from '@angular/core';
import * as M from 'src/app/models/app.models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  formDetails: M.CompanyFormDetails;
  showSpinner : boolean = false ;
  inboundClick : boolean = true;
  outboundClick : boolean = true;


  constructor(private router : Router , private adminService : AdminService , private dataService : DataService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formDetails = {
      compName : null,
      password : null,
      email : null
    }
  }

  submit() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
     this.adminService.addNewCompany(this.formDetails).subscribe(
       (param) => {
        console.log(this.formDetails)
        console.log(param)
      Swal.fire('Registered Company Successfully!', 'Welcome to CouponSystem ' +  this.formDetails.compName  , 'success')
      this.router.navigate(['/admin/profile']);
      console.log(param);
     } , 
     (err) =>  Swal.fire('Register Company Failed!', 'Please try again ', 'error')
     )
     this.inboundClick = true;
     this.outboundClick = true;
    } , 2500 );
  }


}
