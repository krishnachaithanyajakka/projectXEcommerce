import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchProductsService } from '../search-products/service/search-products.service';
import { ProductDetailsService } from './service/product-details.service';
import { Utility } from '../utility/utility';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product;
  constructor(private activatedRoute: ActivatedRoute,
              private searchProductsService : SearchProductsService,
              private productDetailsService: ProductDetailsService,
              private utils : Utility) { }

  ngOnInit() {
    this.loadScript();
    let productId;
    this.activatedRoute.params.subscribe(params => {
      productId = params['id'];
    });
    if(productId != null){
      let self= this;
      this.productDetailsService.getProductFromList(productId).subscribe(productDet=>{
        self.product = productDet.productList[0];
        setTimeout(() => {
          $('#product-main-view').slick({
            infinite: true,
            speed: 300,
            dots: false,
            arrows: true,
            fade: true,
            asNavFor: '#product-view',
          });
        
          $('#product-view').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,
            focusOnSelect: true,
            asNavFor: '#product-main-view',
          });
        }, 1000);
      });
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
