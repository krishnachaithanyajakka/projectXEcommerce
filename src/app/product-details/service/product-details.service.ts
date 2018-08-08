import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor() { }
  getProductFromList(productid:string, productList:any[]): any{
    let product=productList.filter(({productId}) => productId==productid);
    return product[0];
  }
}
