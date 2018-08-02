import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  customer;
  constructor() { }

  public getCustomerData(){
    if(this.customer == null){
      return JSON.parse(sessionStorage.getItem("userDetails"));
    }
    return this.customer;
  }
  public setCustomerData(customerData){
    this.customer=customerData;
  }
}
