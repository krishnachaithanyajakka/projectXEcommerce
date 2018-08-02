import { Injectable } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';
import { map } from 'rxjs/operators';
import { Observable, Subject, throwError, of} from 'rxjs';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  products;
  constructor(private _ajaxService: AjaxService) { }

  // searchProduct1(_item: String):Promise<any>{
  //   return Promise.resolve(this._ajaxService.searchProduct(_item))
  //   .then(products => {
  //     console.log(products);
  //     return products;
  //   },
  //     SystemError => {
  //   });
  // }
  searchProduct(_item: String){
    if(this.getProduct()==null){
      console.log("Coming from Ajax Calls");
      return this._ajaxService.searchProduct(_item).pipe(map((products) => {
        console.log(products);
        this.setProduct(products);
        return products;
      }));
    }else{
      console.log("Coming from Normal Calls");
      return of(this.products);
      //return Observable.create(products=>{ return this.products});
    }
    
    // return Promise.resolve(this._ajaxService.searchProduct(_item))
    // .then(products => {
    //   console.log(products.productList);
    //   return products;
    // },
    //   SystemError => {
    // });
  }

  setProduct(products: any){
    this.products=products;
  }
  getProduct(){
    return this.products;
  }
}
