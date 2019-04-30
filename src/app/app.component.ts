import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {LoginemitterService} from './utility/loginemitter.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';
  isAllowed: Boolean= true;
  auth2:any;
  constructor( private location: Location,
               private loginemitterService: LoginemitterService){
    this.loginemitterService.navFootHideEvent$.subscribe(status => {
      this.isAllowed=status;
    });
  }
  ngOnInit(){
    if (this.location.path().includes('/admin')) {
      this.isAllowed = false;
    } else {
      this.isAllowed = true;
    }

    window['gapi'].load('auth2',function(){
     this.auth2=window['gapi'].auth2.init(
        {
          client_id:'371326695875-fkbdvdsbq9viopq2aljgbtfgih2i78r5.apps.googleusercontent.com'
        }
      );
    });
  }
}
