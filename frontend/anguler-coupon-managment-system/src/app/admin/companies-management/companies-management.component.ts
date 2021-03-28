import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import  * as M from '../../models/app.models';
import Swal from 'sweetalert2';
import { PopupCompanyComponent } from 'src/app/popup-company/popup-company.component';
import { MatDialog } from '@angular/material';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-companies-management',
  templateUrl: './companies-management.component.html',
  styleUrls: ['./companies-management.component.css']
})
export class CompaniesManagementComponent implements OnInit {

  company : M.CompanyFormDetails[];
  companyData : M.Company;

   


  constructor(private adminService : AdminService , private dataService:DataService ,  public dialog : MatDialog) { }


  ngOnInit() {
     this.initCompanies();
  }

  initCompanies(){
    this.adminService.getAllCompanies().subscribe((response : any) =>{
      this.company = response;

    }
  )
}

deleteCompany(companyId){
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

      this.adminService.deleteCompany(companyId).subscribe((response : any) =>{
        console.log(response);
      }
    )
    
      Swal.fire(
        'Deleted!',
        'Company has been deleted.',
        'success'
      )
      setTimeout(()=>{
        this.initCompanies();
      }, 1000)
    }
  })
}

updateCompany(companyId){

  this.adminService.getCompany(companyId).subscribe((response : any) =>{
    this.companyData = response;
    console.log(this.companyData)
    this.dataService.addData(response);
  })
  
   let dialogRef = this.dialog.open(PopupCompanyComponent, {
    width: '700px',
    height: '280px'
  });
  }

}



