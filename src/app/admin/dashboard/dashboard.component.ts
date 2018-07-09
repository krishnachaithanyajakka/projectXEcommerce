import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.component.css',
               '../../../assets/plugins/bootstrap/css/bootstrap.min.css',
               '../../../assets//plugins/chartist-js/dist/chartist.min.css',
               '../../../assets/plugins/chartist-js/dist/chartist-init.css',
               '../../../assets/plugins/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.css',
               '../../../assets/plugins/c3-master/c3.min.css',
               '../../../assets/css/style.css',
               '../../../assets/css/colors/blue.css'
            ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadScript();
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
        var dynamicScripts = ["../../../assets/plugins/jquery/jquery.min.js",
                              "../../../assets/plugins/bootstrap/js/tether.min.js" ,
                              "../../../assets/plugins/bootstrap/js/bootstrap.min.js" ,
                              "../../../assets/js/jquery.slimscroll.js" ,
                              "../../../assets/js/waves.js" ,
                              "../../../assets/js/sidebarmenu.js" ,
                              "../../../assets/plugins/sticky-kit-master/dist/sticky-kit.min.js" ,
                              "../../../assets/js/custom.min.js" ,
                              "../../../assets/plugins/chartist-js/dist/chartist.min.js" ,
                              "../../../assets/plugins/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.min.js" ,
                              "../../../assets/plugins/d3/d3.min.js" ,
                              "../../../assets/plugins/c3-master/c3.min.js" ,
                              "../../../assets/js/dashboard1.js" ,   
                              ];

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
