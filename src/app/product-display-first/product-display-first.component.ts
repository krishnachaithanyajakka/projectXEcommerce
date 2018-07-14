import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-product-display-first',
  templateUrl: './product-display-first.component.html',
  styleUrls: ['./product-display-first.component.css']
})
export class ProductDisplayFirstComponent implements OnInit {

  constructor(private router: Router,) {
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    // let quickViewBtn = <HTMLElement>document.body.querySelector(".quick-view");
    // quickViewBtn.addEventListener("click", (e:Event) =>{
    //   e.preventDefault();
    //   this.showproductDetails(e)
    // });
  }
  showproductDetails(id){
    this.router.navigate(['product/',id])
  }
  

}
