import { Component, OnInit } from '@angular/core';
import { AwssettingsService } from '../services/awssettings.service';
import { HompageService } from './service/hompage.service';
import { Router } from '@angular/router';
import * as _ from "lodash";
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  bannerimage = [];
  bannerContainerContent : String;
  private getParams = {
    Bucket: this.awsService.getBucketName(),
    Prefix : 'banner/homepage/'
  };
  constructor(private awsService: AwssettingsService,
              private _hompageService : HompageService,
              private router: Router) { }

  ngOnInit() {
    this.loadScript();
  }
  ngAfterViewInit(){
    let self = this;
    this._hompageService.getBanner("1").subscribe(bannerContainer=>{
      //this.ownerIds = ownerIds;
      bannerContainer.html =  bannerContainer.html.replace(new RegExp('{{bannerimage}}','g'), bannerContainer.imageURL )
     // self.bannerContainerContent = bannerContainer.html;
      $('#bannerContainerContent').append(bannerContainer.html);
    });
    
    // this.awsService.getFiles(this.getParams,function(data){
    //   self.bannerimage = data[0].Location;
    // });
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
  goToProduct(id: String){
    if(id == null){
      this.router.navigate(['/searchproduct'])
    }else{
      this.router.navigate(['product/',id])
    }
  }
}
