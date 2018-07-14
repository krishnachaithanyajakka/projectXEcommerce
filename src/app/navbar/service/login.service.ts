import { Injectable } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';
import {LoginemitterService} from '../../utility/loginemitter.service';
import { Customer } from '../../pojo/Customer';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginStatus: boolean=false;
  //customerData: Customer;
  constructor(private _ajaxService : AjaxService,
              private loginEmitterService : LoginemitterService,
              private customer: Customer) { }

  getLoginStatus(){
    return this.loginStatus;
  }
  setLoginStatus(loginStatus){
    this.loginStatus=loginStatus;
  }
  getCustomerData(){
    return this.customer;
  }
  setCustomerData(customerData){
    this.customer=customerData;
  }

  login(customerDetails): void {
    Promise.resolve(this._ajaxService.loginCustomer(customerDetails))
    .then(customerdetail => {
      if(customerdetail != null){
        this.customer.setName(customerdetail.customerDetailsList[0].name);
        this.customer.setId(customerdetail.customerDetailsList[0].id);
        this.customer.setImage(customerdetail.customerDetailsList[0].image);
        this.setLoginStatus(true);
        this.setCustomerData(this.customer);
        console.log("Customer Status::"+ this.getLoginStatus());
        this.loginEmitterService.broadcastLoginEvent(true);
      }
    },
      SystemError => {
    });
  }

}
