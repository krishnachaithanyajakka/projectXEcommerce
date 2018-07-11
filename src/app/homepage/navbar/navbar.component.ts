import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NarbarService} from './service/narbar.service';
import { LoginService} from './service/login.service';
import { LoginemitterService } from '../../utility/loginemitter.service';
import { Router } from '@angular/router';
import { Customer } from '../../pojo/Customer';
import { } from 'googlemaps';
//import { AuthService } from './auth/auth.service';
// import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;
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
  formLogin = this.formBuilder.group({
    'emailFormControl': ['', [Validators.required, Validators.email]],
    'passwordFormControl' : ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder,
              private navBarService: NarbarService,
              private _loginService : LoginService,
              private loginemitterService: LoginemitterService,
              private router: Router,
              private customer: Customer) {
    // private router: Router, 
    // private http: Http
    //this.loadScript();
    console.log(navBarService.getUserIsLoggedIn());
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    window.fbAsyncInit = () => {
        console.log("fbasyncinit")

        FB.init({
            appId            : '236517903785922',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.10'
        });
        FB.AppEvents.logPageView();
        // This is where we do most of our code dealing with the FB variable like adding an observer to check when the user signs in

        // ** ADD CODE TO NEXT STEP HERE **
        FB.Event.subscribe('auth.statusChange', (response => {
          if (response.status === 'connected') {
            console.log(response);
            console.log(response.authResponse);
            // use the response variable to get any information about the user and to see the tokens about the users session
            console.log('Welcome!  Fetching your information.... ');
            FB.api(
              "/" + response.authResponse.userID + '?fields=id,name,first_name,email,gender,picture,age_range,friends',
              (result) => {
                  console.log("result===", result);
                  this.userDetails = result;
                  customer.setName(result.first_name);
                  customer.setId(result.id);
                  customer.setImage(result.picture.data.url);
                  if(result.first_name !=null && 
                    result.id != null){
                  let details={
                    "id" : result.id,
                    "name" : result.first_name,
                    "email" : result.email!=null? result.email: "",
                    "loginMedium" : "facebook"
                  }
                  var loginDetails={
                    "customerDetails" : details
                  }
                  this._loginService.login(loginDetails);
                }else{
                  //throw error that you cannot login through facebook , you need help.Serious Help.
                }
                  if (result && !result.error) {
                  }
            });
          }
        }));
    };
    //auth.handleAuthentication();
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
   
            } else {
              alert("No address available");
            }
          }
});
      });
    }
    this.loginSubscription = this.loginemitterService.loginEvent$.subscribe(loginStatus => {
      this.loginStatus= loginStatus;
      this.userDetails=this._loginService.getCustomerData();
      console.log(this.loginStatus);
    });
   }

  ngOnInit() {
    this.loginStatus=this._loginService.getLoginStatus();
    console.log("loginStatus::"+this.loginStatus)
    if(this.userDetails == null){
      this.userDetails=this._loginService.getCustomerData();
    }
    if(this.loginStatus ==null || this.loginStatus== false){
      this.router.navigate(['/']);
    }
    if (window.FB) {
      window.FB.XFBML.parse();
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
  login(){
    let customer={
      "email" : this.formLogin.controls["emailFormControl"].value,
      "password" : this.formLogin.controls["passwordFormControl"].value,
      "loginMedium" : "manual"
    }
    var loginDetails={
      "customerDetails" : customer
    }
    if(this.formLogin.valid){
      this._loginService.login(loginDetails); 
    }
  }

  searchData(_item: string) { // should be called when minimum no of character are 5 in the text field.
    console.log(_item);
    if(_item.length >3){
      Promise.resolve(this.navBarService.searchProduct(_item))
      .then(productlistresponse => {
        if(productlistresponse && productlistresponse.productList.length>0){
          this.products=productlistresponse.productList;
          console.log(this.products);
        }
      });      
    }else{
      $('.product_dropdown p').remove();
    }
  }
}
