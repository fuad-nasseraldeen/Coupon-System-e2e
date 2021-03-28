import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { NetService } from './net/net.service';
import  * as M from '../models/app.models';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  
  constructor(private net: NetService) {
  }

  registerUser(form: M.SignupFormDetails ): Observable <any> {
    return this.net.registerUser(form);
   }


}
