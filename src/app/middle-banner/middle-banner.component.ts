import { Component, OnInit } from '@angular/core';
import { AwssettingsService } from '../services/awssettings.service';
import { MiddleBannerService } from './service/middle-banner.service';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import * as _ from "lodash";

import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;
@Component({
  selector: 'app-middle-banner',
  templateUrl: './middle-banner.component.html',
  styleUrls: ['./middle-banner.component.css']
})
export class MiddleBannerComponent implements OnInit {
  middleCorousel = [];
  corouselContainerContent;
  private getParams = {
    Bucket: this.awsService.getBucketName(),
    Prefix : 'corousel/1/'
  };
  constructor(private awsService: AwssettingsService,
              private _middleBannerService : MiddleBannerService,
              private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    let self = this;
    this._middleBannerService.getCorousel("1").subscribe(corouselContainer=>{
      //this.ownerIds = ownerIds;
      let courouseltot='';
      corouselContainer.forEach(element => {
        element.html = element.html.replace(new RegExp('{{image}}','g'), element.imageURL);
        element.html = element.html.replace(new RegExp('{{id}}','g'), element.productID);
        courouseltot +=  element.html;
      });
      self.corouselContainerContent = courouseltot;
      //this._sanitizer.bypassSecurityTrustHtml(self.corouselContainerContent);
      $('#corouselContainerContent').append(courouseltot);
      let that =self;
      setTimeout(() => {
        let buttons = $('.mid_banner');
        _.each(buttons,function(buttons,index){
          $(buttons).data('target',corouselContainer[index].productID);
        })
      }, 10);
     
    });
    // this.awsService.getFiles(this.getParams,function(data){
    //   self.middleCorousel = data;
    // });
  }
}
