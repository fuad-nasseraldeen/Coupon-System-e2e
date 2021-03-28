import { Injectable } from '@angular/core';
import { NetService } from './net/net.service';
import * as M from '../models/app.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private netService: NetService) { }

  getAllCompanyCoupons (): Observable <M.ICoupon[]> {
    return this.netService.getAllCompanyCoupons();
   }

  


}
