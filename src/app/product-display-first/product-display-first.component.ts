import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdminTemplateService } from "../admin-template/service/admin-template.service";
import { AwssettingsService } from '../services/awssettings.service';
import { ProductDisplayService } from './service/product-display.service';
import { Utility } from '../utility/utility';
import * as _ from "lodash";

import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-product-display-first',
  templateUrl: './product-display-first.component.html',
  styleUrls: ['./product-display-first.component.css']
})
export class ProductDisplayFirstComponent implements OnInit {

  images: any;
  middleCorouselContainer;
  private getParams = {
    Bucket: this.awsService.getBucketName(),
    Prefix : 'corousel/2/'
  };
  constructor(private router: Router,
              private templateService : AdminTemplateService,
              private awsService: AwssettingsService,
              private _productDisplayService : ProductDisplayService,
              private utils : Utility
            ) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(){
      let self = this;
      this._productDisplayService.getCorousel("2").subscribe(corouselContainer=>{
        //this.ownerIds = ownerIds;
        let courouseltot='';
        self.middleCorouselContainer =  corouselContainer;
        corouselContainer.forEach(element => {
          element.html = element.html.replace(new RegExp('{{image}}','g'), element.imageURL);
          element.html = element.html.replace(new RegExp('{{id}}','g'), element.productID);
          courouseltot +=  element.html;
        });
        //this._sanitizer.bypassSecurityTrustHtml(self.corouselContainerContent);
        $('#middleCorouselContainer').append(courouseltot);
        let that =self;
        setTimeout(() => {
          // let buttons = $('.mid_banner');
          // _.each(buttons,function(buttons,index){
          //   $(buttons).data('target',corouselContainer[index].productID);
          // });
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
        }, 10);
       
      });
      // this.awsService.getFiles(this.getParams,function(data){
      //   self.images=data;
      //   console.log(self.images);
      //   setTimeout(() => {
      //   }, 10000);
      // });
    
  }
  showproductDetails(id){
    this.router.navigate(['product/',id])
  }
  

}
