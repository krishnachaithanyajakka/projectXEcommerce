import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdminTemplateService } from "../admin-template/service/admin-template.service"

import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-product-display-first',
  templateUrl: './product-display-first.component.html',
  styleUrls: ['./product-display-first.component.css']
})
export class ProductDisplayFirstComponent implements OnInit {

  images: any 
  constructor(private router: Router,
              private templateService : AdminTemplateService) {
  }

  ngOnInit() {
    let self=this;
    this.templateService.getFiles('promotions',function(data){
      self.images=data;
      console.log(self.images);
      setTimeout(() => {
        $('#product-slick-1').slick({
          slidesToShow: 3,
          slidesToScroll: 2,
          autoplay: true,
          infinite: true,
          speed: 300,
          dots: true,
          arrows: false,
          appendDots: '.product-slick-dots-1',
          responsive: [{
              breakpoint: 991,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                dots: false,
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
          ]
        });
      }, 10000);
      
    });
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
