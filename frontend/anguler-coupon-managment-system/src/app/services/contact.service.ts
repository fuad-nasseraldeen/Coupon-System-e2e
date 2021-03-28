import { Injectable } from '@angular/core';
import { NetService } from './net/net.service';
import * as M from '../models/app.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  

  constructor(private netService: NetService) { }

  
  saveMessage(form: M.Contact ): Observable <any> {
    
    return this.netService.contact(form);
  }
}
