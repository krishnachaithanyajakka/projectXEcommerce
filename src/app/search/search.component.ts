import { Component, OnInit} from '@angular/core';
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
  count: number=0
  constructor(private searchService: SearchServiceService) { }

  ngOnInit() {
  }

  searchData(_item: string) { // should be called when minimum no of character are 5 in the text field.
    console.log(_item);
    console.log(this.count);
    if(_item.length >3){
      let self=this;
      self.products = []
      this.searchService.searchProduct(_item).subscribe((items:any)=>{
        console.log(items);
        if(items && items.productList.length>0){
            self.products=items.productList;
            console.log(self.products);
            if(this.count==3){
              this.searchService.setProduct([]);
            }
        }
      });
      this.count=this.count+1;
      
      // Promise.resolve(this.searchService.searchProduct(_item))
      // .then(productlistresponse => {
      //   if(productlistresponse && productlistresponse.productList.length>0){
      //     self.products=productlistresponse.productList;
      //     console.log(self.products);
      //   }
      // });      
    }else{
      $('.product_dropdown li').remove();
    }
  }


}
