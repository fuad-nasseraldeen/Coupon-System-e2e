import { Injectable } from '@angular/core';
import { NetService } from './net/net.service';
import { Observable } from 'rxjs';
import  * as M from '../models/app.models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private net: NetService) { }

  loginUser(form: M.LoginFormDetails ): Observable <any> {
    return this.net.loginUser(form);
   }

}
