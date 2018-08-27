import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products : any;
  constructor(private _productService : ProductService,
              private router : Router) { }

  ngOnInit() {
    let self = this;
    this._productService.getOwnerProducts().subscribe(products=>{
      self.products = products;
      self._productService.setProductList(self.products);
    });
  }

  update(id: String){
    let self =  this;
    _.each(this._productService.getProductList(),function(products,index){
      if(products["productId"] == id){
        self.router.navigate(['product-req/',id]);
      }
    })
  }
  delete(id : String){
    let self = this;
    let productIDList =[];
    productIDList.push(id);
    this._productService.deleteProduct(productIDList).subscribe(products=>{
      self.products = products;
      self._productService.setProductList(self.products);
    });
  }

}
