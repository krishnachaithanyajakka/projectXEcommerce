import { Injectable } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {
  productList:any=[];
  constructor(private _ajaxService : AjaxService) { }
  setProductList(productList){
    this.productList= productList.productList;
  }
  getProductList(){
    return this.productList;
  }
  listProducts(item){
    return this._ajaxService.searchProductList(item).pipe(map((productList) => {
      this.setProductList(productList);
      console.log(this.getProductList());
      return productList;
    }));
  }
}
