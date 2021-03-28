import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  ifThereIsSession() {
    if (!!sessionStorage.getItem('Cookie') && !!sessionStorage.getItem('Role')) {
      return true;
    }
    else {
      return false;
    }
  }

  adminLoggedIn() {
    if (!!sessionStorage.getItem('Cookie') === true && sessionStorage.getItem('Role') === JSON.stringify("ADMIN")) {
      return true;
    } else {
      return false;

    }
  }

  companyLoggedIn() {
    if (!!sessionStorage.getItem('Cookie') === true && sessionStorage.getItem('Role') === JSON.stringify("COMPANY")) {
      return true;
    } else {
      return false;
    }
  }

  customerLoggedIn() {
    if (!!sessionStorage.getItem('Cookie') === true && sessionStorage.getItem('Role') === JSON.stringify("CUSTOMER")) {
      return true;
    } else {
      return false;
    }
  }
}