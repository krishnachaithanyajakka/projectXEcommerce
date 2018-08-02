import { Injectable } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';
import { map } from 'rxjs/operators';
//import {UserdetailsService} from '../../services/userdetails.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  customerStatus
  constructor(private _ajaxService : AjaxService) { }

  registration(customerDetails) {
    this._ajaxService.addCustomer(customerDetails).subscribe((customerStatus:any)=>{
      console.log("Customer Status::"+ customerStatus);
    });
    // return this._ajaxService.addCustomer(customerDetails).pipe(map((customerStatus) => {
    //   console.log(customerStatus);
    //   console.log("Customer Status::"+ customerStatus);
    // }));
    // Promise.resolve(this._ajaxService.addCustomer(customerDetails))
    // .then(customerStatus => {
    //   console.log("Customer Status::"+ customerStatus);
    // },
    //   SystemError => {
    // });
  }
}
