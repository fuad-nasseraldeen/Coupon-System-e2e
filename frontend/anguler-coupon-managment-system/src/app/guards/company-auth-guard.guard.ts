import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyAuthGuard implements CanActivate {
  constructor(private router: Router , private authService : AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

     // test if user is auth 
      if(this.authService.companyLoggedIn()){
      return true;
     }
     else{
      console.log('Hey im am Company Guard');
       return false;
     }
  
  }
  
}

