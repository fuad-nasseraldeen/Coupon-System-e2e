import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  ifAdminLoggedIn(){
    if(this.authService.adminLoggedIn()){
      return true;
    } else {
      return false;
    }
   }
 
   ifCompanyLoggedIn(){
     if(this.authService.companyLoggedIn()){
       return true;
     } 
   }
 
   ifCustomerLoggedIn(){
     if(this.authService.customerLoggedIn()){
       return true;
     } 
   }
 
   ifLoggedIn(){
     if(this.authService.ifThereIsSession()){
       return true;
     }    
   }

}
