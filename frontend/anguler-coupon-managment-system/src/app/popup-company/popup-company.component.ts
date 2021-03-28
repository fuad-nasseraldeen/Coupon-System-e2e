import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialogRef } from '@angular/material';
import { PopupCustomerComponent } from '../popup-customer/popup-customer.component';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import * as M from '../models/app.models';



@Component({
  selector: 'app-popup-company',
  templateUrl: './popup-company.component.html',
  styleUrls: ['./popup-company.component.css']
})
export class PopupCompanyComponent implements OnInit {

  constructor(private dataService: DataService, private adminService: AdminService,
    private dialogRef: MatDialogRef<PopupCompanyComponent>,
    private router: Router) { }

  companyData: M.Company;
  showSpinner: boolean = false;
  inboundClick: boolean = true;
  outboundClick: boolean = true;

  initCompanyData() {
    this.companyData = {
      compName: null,
      companyId: null,
      email: null,
      password: null
    }
  }

  updateCompany() {
    this.companyData = {
      companyId: this.companyData.companyId,
      email: this.companyData.email,
      compName: this.companyData.compName,
      password: this.companyData.password
    }
  }

  ngOnInit() {
    this.initCompanyData();
    this.dataService.newDataSubject.subscribe(
      data => this.companyData = data
    )
  }

  onSave() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.updateCompany();
      this.adminService.updateCompany(this.companyData).subscribe(
        (param) => {
          console.log(this.companyData)

          Swal.fire('Update Successfully!', '' + this.companyData.compName, 'success')
          this.router.navigate(['/admin/companies']);
          console.log(param);
        },
        (err) => Swal.fire('Update Failed!', 'Company Name is taken or invalid, please try again ', 'error')
      )
      this.inboundClick = true;
      this.outboundClick = true;
      this.onCancel();
    }, 3000);
  }


  onCancel() {
    this.dialogRef.close();
  }


}
