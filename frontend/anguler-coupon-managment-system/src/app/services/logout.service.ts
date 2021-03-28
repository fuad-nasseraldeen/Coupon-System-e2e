import { Injectable } from '@angular/core';
import { NetService } from './net/net.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private net: NetService) { }

  logoutUser():  Observable<any> {
    return this.net.logoutUser();
   }

}
