import { Injectable } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private _ajaxService : AjaxService) { }
  // getProductFromList(productid:string, productList:any[]): any{
  //   let product=productList.filter(({productId}) => productId==productid);
  //   return product[0];
  // }
  getProductFromList(productid: String){
    return this._ajaxService.getProductDetails(productid);
  }
}
