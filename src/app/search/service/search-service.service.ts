import { Injectable } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private _ajaxService: AjaxService) { }

  searchProduct(_item: String):Promise<any>{
    return Promise.resolve(this._ajaxService.searchProduct(_item))
    .then(products => {
      console.log(products.productList);
      return products;
    },
      SystemError => {
    });
  }
}
