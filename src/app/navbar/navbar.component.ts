import { Component, OnInit , HostListener} from '@angular/core';
import {FormControl, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavbarService} from './service/navbar.service';
import { LoginemitterService } from '../utility/loginemitter.service';
import {UserdetailsService} from '../services/userdetails.service';
import { Router } from '@angular/router';
import 'jquery';
import 'bootstrap';
// import { } from 'googlemaps';
//import { AuthService } from './auth/auth.service';
// import { HttpClient } from '@angular/common/http';
declare var $ : any;
//window['$'] = window['jQuery'] = $;
//import * as _ from 'underscore';

declare var window: any;
declare var FB: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  lat:any;
  lng:any;
  address;
  userDetails;
  loginSubscription;
  loginStatus;
  products;
  locationCity: String ="";
  pathName="";

  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.pathName=window.location.pathname;
  }
  constructor(private formBuilder: FormBuilder,
              private navBarService: NavbarService,
              private loginemitterService: LoginemitterService,
              private router: Router,
              private _userdetailsService: UserdetailsService) {
    // private router: Router, 
    // private http: Http
    //this.loadScript();
    console.log(this.navBarService.getUserIsLoggedIn());
    //auth.handleAuthentication();
    
    this.loginSubscription = this.loginemitterService.loginEvent$.subscribe(loginStatus => {
      this.userDetails=this._userdetailsService.getCustomerData();
      console.log(this.loginStatus);
      this.router.navigate(['/']);
    });
   }

  ngOnInit() {
    this.userDetails=this._userdetailsService.getCustomerData();
    console.log("loginStatus::"+this.loginStatus)
    if(this.userDetails == null){
      this.userDetails=this._userdetailsService.getCustomerData();
    }
    if(this.loginStatus ==null || this.loginStatus== false){
     // this.router.navigate(['/']);
    }
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    this.loadScript();
    if (navigator)
    {
    let self=this;
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(this.lat, this.lng);
        let request = {
          location: latlng
        }; 
        geocoder.geocode(request, (results, status) => {       //<<<===removed function keyword and added arrowfunction

          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0] != null) {
             let city = results[0].address_components[results[0].address_components.length-5].short_name;                      
              console.log(city);
              self.locationCity=city;
              console.log("self++"+  self.locationCity);
              setTimeout(function(){
                $('.location-input').val(self.locationCity);
              },10)
              
            } else {
              alert("No address available");
            }
          }
});
      });
    }
  }
  // getCurrentIpLocation(): Observable<any> {
  //   return this._http.get('http://ipinfo.io')
  //   .map(response => response.json())
  //   .catch(error => {
  //       console.log(error);
  //       return Observable.throw(error.json());
  //   });
  // }
  ngAfterViewInit(){
    console.log(window.location.pathname);
    this.pathName=window.location.pathname;
  }
  openModal(id){
    $("#"+id).modal('show');
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
        var dynamicScripts = ["../assets/js/bootstrap.min.js"];
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
  logout(){
    sessionStorage.removeItem("userDetails");
    this._userdetailsService.setCustomerData(null);
    this.userDetails = null;
  }
  openadmin(){
    this.loginemitterService.broadcastNavFootHideEvent(false);
  }
}
