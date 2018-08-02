import { Injectable } from '@angular/core';
import { AjaxService } from '../../../services/ajax.service';
@Injectable({
  providedIn: 'root'
})
export class ProductRequirementService {

  constructor(private _ajaxService : AjaxService) { }
  registerProduct(productDetails: any){
    this._ajaxService.registerProduct(productDetails).subscribe((productDetails:any)=>{
      console.log("Customer Status::"+ productDetails);
    });
  }
}
