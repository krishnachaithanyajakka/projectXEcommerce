import { Component, OnInit } from '@angular/core';
import { SearchServiceService} from './service/search-service.service';
import 'jquery';

declare var $ : any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products;
  constructor(private searchService: SearchServiceService) { }

  ngOnInit() {
  }

  searchData(_item: string) { // should be called when minimum no of character are 5 in the text field.
    console.log(_item);
    if(_item.length >3){
      Promise.resolve(this.searchService.searchProduct(_item))
      .then(productlistresponse => {
        if(productlistresponse && productlistresponse.productList.length>0){
          this.products=productlistresponse.productList;
          console.log(this.products);
        }
      });      
    }else{
      $('.product_dropdown p').remove();
    }
  }


}
