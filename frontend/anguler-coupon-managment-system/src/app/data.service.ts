import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import  * as M from './models/app.models';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {

  public newDataSubject = new Subject<any>();
  public homeArray = new Subject<any>();
  public totalPrice = new Subject<any>();


  constructor() { }

 ngOnInit(){
 
 }

 addData(data: any){
   this.newDataSubject.next(data);
 }

addDataToLocalStorage(key: string, data: any) {
  sessionStorage.setItem(key, JSON.stringify(data));
  if(!this.newDataSubject)
        return;
  this.newDataSubject.next(data);
}

watchItemsInCart(): Observable<any> {
  if(this.newDataSubject != undefined){
  return this.newDataSubject.asObservable();
  }
}

transferDataFromHome(data : any) {
  this.homeArray.next(data);
}

addDataToTotalPrice(data : any) {
  this.totalPrice.next(data);
}


}