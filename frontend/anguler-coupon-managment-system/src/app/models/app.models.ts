import * as E from './app.enums';

export interface Customer {
  id:string;
  customerName: string;
  password: string;
}

export interface Company {
  companyId:string;
  compName : string; 
  password : string;
  email : string;
}


export interface SignupFormDetails {
  customerName: string;
  password: string;
}


export interface LoginFormDetails {
  username: string;
  password: string;
  type: E.ClientType
}

export interface ICoupon {
  title:string; 
  startDate:Date; 
  endDate:Date;
  amount:number;
  couponType:string,
  message:string; 
  price:number;
  image:string; 
  companyId:number; 
  isActive:boolean;
}

export interface CompanyFormDetails  {

  compName : string; 
  password : string;
  email : string;
  
}

export interface CouponForm {
  id : number;
  title:string; 
  amount:number;
  message:string; 
  startDate:Date;
  endDate:Date;
  price:number;
  image:string; 
  type : E.CouponType
}
export interface Contact {

  contactId: string;
  contactName: string;
  contactEmail: string;
  subject: string;
  message: string;
}

export interface customerProfile{
  id : number ;
  customerName : string;
  password : string;
}

