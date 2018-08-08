import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchProductsService } from '../search-products/service/search-products.service';
import { ProductDetailsService } from './service/product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product;
  constructor(private activatedRoute: ActivatedRoute,
              private searchProductsService : SearchProductsService,
              private productDetailsService: ProductDetailsService) { }

  ngOnInit() {
    this.loadScript();
    let productId;
    this.activatedRoute.params.subscribe(params => {
      productId = params['id'];
    });
    if(productId != null){
      this.product= this.productDetailsService.getProductFromList(productId,this.searchProductsService.getProductList());
    }
  }
  public loadScript() {  
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }
    if (!isFound) {
        var dynamicScripts = ["../assets/js/slick.min.js",
                              "./assets/js/main.js"];

        for (var i = 0; i < dynamicScripts .length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }

    }
  }

}
