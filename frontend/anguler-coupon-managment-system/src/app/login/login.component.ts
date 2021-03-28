import { Component, OnInit } from '@angular/core';
import * as M from '../models/app.models';
import * as E from '../models/app.enums';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from 'selenium-webdriver/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginError : boolean = false;
  options = [];
  loginForm: M.LoginFormDetails
  clientType = E.ClientType;
  private cookie : string;
  showSpinner : boolean = false ;
  inboundClick : boolean = true;
  outboundClick : boolean = true;
 
  constructor(private loginService : LoginService , private cookieService : CookieService , private router : Router ) { }

  
  ngOnInit() {

    this.initForm();
    this.initOptionsArray()
  }

  initOptionsArray(){
    for (const key in this.clientType) {
      let item = {
        key:key,
        value:key.toUpperCase()
      }
      this.options.push(item);
    }
  }

  initForm() {
    this.loginForm = {
      type: null,
      password: null,
      username: null
    }
  }

  submit(){
    this.showSpinner = true;
    setTimeout(()=>{
      this.showSpinner = false;
    this.loginService.loginUser(this.loginForm) .subscribe((response:any) => {

      sessionStorage.setItem('Cookie', JSON.stringify(response.body.value));
      sessionStorage.setItem('Role'  , JSON.stringify(response.body.comment));
      sessionStorage.setItem('Cart'  , '[]')
      
      if(response.body.comment == "ADMIN" ){
        this.router.navigate(['/admin/profile'])
      }
      
      if(response.body.comment == "CUSTOMER"){
        this.router.navigate(['/customer/home'])
      }
      
      if(response.body.comment == "COMPANY" ){
        this.router.navigate(['/company/profile'])
      
      }
  
    }, (err) =>   Swal.fire('Login Failed!', 'Please try again ' , 'error'))
    this.inboundClick = true;
    this.outboundClick = true;
  }, 2000)
   
  }




}
