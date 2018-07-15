import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  loginStatus;
  customer;

  constructor() { }

  public getLoginStatus(){
    return this.loginStatus;
  }
  public setLoginStatus(loginStatus){
    this.loginStatus=loginStatus;
  }
  public getCustomerData(){
    return this.customer;
  }
  public setCustomerData(customerData){
    this.customer=customerData;
  }
}
