import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [  './dashboard.component.css',
                '../../../assets/js/vendor/fontawesome-free/css/all.min.css',
                '../../../assets/js/vendor/datatables/dataTables.bootstrap4.css',
                '../../../assets/css/sb-admin.css',

            ]
})
export class DashboardComponent implements OnInit {

  constructor() { 
  }

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
        var dynamicScripts = [
                                "../../../assets/js/vendor/jquery/jquery.min.js",
                                "../../../assets/js/vendor/bootstrap/js/bootstrap.bundle.min.js",
                                "../../../assets/js/vendor/jquery-easing/jquery.easing.min.js" ,
                                "../../../assets/js/vendor/chart.js/Chart.min.js" ,
                                "../../../assets/js/vendor/datatables/jquery.dataTables.js" ,
                                "../../../assets/js/vendor/datatables/dataTables.bootstrap4.js" ,
                                "../../../assets/js/vendor/sb-admin.min.js"  
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
