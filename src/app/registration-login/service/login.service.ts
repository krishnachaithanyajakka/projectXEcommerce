import { Injectable } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';
import {LoginemitterService} from '../../utility/loginemitter.service';
import {UserdetailsService} from '../../services/userdetails.service';
import { Customer } from '../../pojo/Customer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    loginStatus: boolean=false;
    constructor(private _ajaxService : AjaxService,
                private loginEmitterService : LoginemitterService,
                private customer: Customer,
                private userdetailsService : UserdetailsService ) { }
  
    
    login(customerDetails): void {
      Promise.resolve(this._ajaxService.loginCustomer(customerDetails))
      .then(customerdetail => {
        if(customerdetail != null){
          this.customer.setName(customerdetail.customerDetailsList[0].name);
          this.customer.setId(customerdetail.customerDetailsList[0].id);
          this.customer.setImage(customerdetail.customerDetailsList[0].image);
          this.userdetailsService.setLoginStatus(true);
          this.userdetailsService.setCustomerData(this.customer);
          console.log("Customer Status::"+ this.userdetailsService.getLoginStatus());
          this.loginEmitterService.broadcastLoginEvent(true);
        }
      },
        SystemError => {
      });
    }
  
}
