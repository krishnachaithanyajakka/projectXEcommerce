import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchProductsService } from './service/search-products.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {
  item;
  productList: any = [];
  constructor(private activatedRoute : ActivatedRoute,
              private searchProductsService : SearchProductsService,
              private router : Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.item = params['searchitem'];
    });
    this.searchProductsService.listProducts(this.item).subscribe((items:any)=>{
      console.log(items);
      this.productList=items.productList;
    });
  }
  showProduct(event){
    console.log(event);
    let productId=event.target.dataset.target;
    this.router.navigate(['product/',productId])
  }

}
