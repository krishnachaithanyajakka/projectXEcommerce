import { Injectable } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';
//import {UserdetailsService} from '../../services/userdetails.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _ajaxService : AjaxService) { }

  registration(customerDetails): void {
    Promise.resolve(this._ajaxService.addCustomer(customerDetails))
    .then(customerStatus => {
      console.log("Customer Status::"+ customerStatus);
    },
      SystemError => {
    });
  }
}
