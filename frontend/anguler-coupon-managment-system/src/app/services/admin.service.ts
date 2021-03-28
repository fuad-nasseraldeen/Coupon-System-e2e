import { Injectable } from '@angular/core';
import { NetService } from './net/net.service';
import  * as M from '../models/app.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private netService : NetService) { }

  addNewCompany(form: M.CompanyFormDetails ): Observable <any> {
    return this.netService.addNewCompany(form);
   }

   getAllCompanies() : Observable<M.CompanyFormDetails[]>{
     return this.netService.getAllCompanies();
   }

   getAllCustomers() : Observable<M.Customer[]>{
    return this.netService.getAllCustomers();
  }

   deleteCompany(companyId : number): Observable<any>{
     return this.netService.deleteCompany(companyId);
   }

   deleteCustomer(customerId : number): Observable<any>{
    return this.netService.deleteCustomer(customerId);
  }

  getCustomer(customerId : number) : Observable<M.Customer>{
    return this.netService.getCustomer(customerId);
  }

  updateCustomer(customerDetails : M.Customer) : Observable<any>{
    return this.netService.updateCustomer(customerDetails);
  }

  getCompany(companyId : number) : Observable<M.Company>{
    return this.netService.getCompany(companyId);
  }

  updateCompany(companyDetails : M.Company) : Observable<any>{
    return this.netService.updateCompany(companyDetails);
  }



}
