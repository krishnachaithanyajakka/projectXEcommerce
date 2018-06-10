import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from 'googlemaps'
//import { AuthService } from './auth/auth.service';
// import { HttpClient } from '@angular/common/http';


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
  formLogin = this.formBuilder.group({
    'emailFormControl': ['', [Validators.required, Validators.email]],
    'passwordFormControl' : ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder) {
    // private router: Router, 
    // private http: Http
    //this.loadScript();
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
              "/" + response.authResponse.userID + '?fields=id,name,first_name,email,gender,picture.width(150).height(150),age_range,friends',
              (result) => {
                  console.log("result===", result);
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
             //this.shareService.setLocationDetails(city);
              self.address=city;

            } else {
              alert("No address available");
            }
          }
});
      });
    }
   }

  ngOnInit() {
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

}
