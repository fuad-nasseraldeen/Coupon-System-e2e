import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { SignupService } from '../services/signup.service';
import * as M from '../models/app.models';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

  
  formDetails: M.SignupFormDetails;
  showSpinner : boolean = false ;
  inboundClick : boolean = true;
  outboundClick : boolean = true;

  constructor(
    private signupService: SignupService,
    private router : Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formDetails = {
      password: null,
      customerName: null
    }
  }

  submit() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
     this.signupService.registerUser(this.formDetails).subscribe(
       (param) => {
      Swal.fire('Registered Successfully!', 'Welcome to CouponSystem ' +  this.formDetails.customerName  , 'success')
      this.router.navigate(['/login']);
      console.log(param);
     } , 
     (err) =>  Swal.fire('Registered Failed!', 'Username is taken or invalid, please try again ', 'error')
     )
     this.inboundClick = true;
     this.outboundClick = true;
    } , 2500 );
  }




}
