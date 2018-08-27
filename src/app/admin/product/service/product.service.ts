import { Injectable } from '@angular/core';
import { AjaxService } from '../../../services/ajax.service';
import {UserdetailsService} from '../../../services/userdetails.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _ajaxService : AjaxService,
              private _userdetails : UserdetailsService) { }
  
  productList = [];
  setProductList(productList : any[]){
    this.productList = productList
  }
  getProductList(){
    return this.productList;
  }
  getOwnerProducts() {
    let owner= this._userdetails.getCustomerData();
    return this._ajaxService.getProductOfOwner(owner.id);
  }
  deleteProduct(id : any){
    return this._ajaxService.deleteProduct(id);
  }
}
