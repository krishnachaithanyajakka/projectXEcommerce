import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './service/registration.service';
import { LoginService } from './service/login.service';
import { DocUploadComponent } from '../doc-upload/doc-upload.component';
import { Customer } from '../pojo/Customer';
import { Router, ActivatedRoute } from '@angular/router';
import {environment} from './../../environments/environment';

import { Utility } from '../utility/utility';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;
declare var window: any;
declare var FB: any;


@Component({
  selector: 'app-registration-login',
  templateUrl: './registration-login.component.html',
  styleUrls: ['./registration-login.component.scss',
    '../../assets/css/login.css'
  ]
})
export class RegistrationLoginComponent implements OnInit {

  isLinear = false;
  userDetails;
  submitted: boolean = false;
  form: FormBuilder;
  category;
  activeForm;

  firstFormGroup = this._formBuilder.group({
    "name": ['', Validators.required],
    "email": ['', [Validators.required, Validators.email]],
    "password": ['', Validators.required],
    "categoryChoice": ['', null]
    // "confirmpassword": ['', Validators.required]
  });
  registrationFormGroup = this._formBuilder.group({
    "address": ['', Validators.required],
    "pincode": ['', Validators.required],
    "contact": ['', Validators.required]
  });
  formLogin = this._formBuilder.group({
    'emailFormControl': ['', [Validators.required, Validators.email]],
    'passwordFormControl': ['', [Validators.required]]
  });
  @ViewChild(DocUploadComponent) docuploadpath;
  constructor(private _formBuilder: FormBuilder,
    private _registrationService: RegistrationService,
    private _loginService: LoginService,
    private customer: Customer,
    private utils: Utility,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {
      console.log("fbasyncinit")

      FB.init({
        appId: '236517903785922',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.10'
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
              if (result.first_name != null &&
                result.id != null) {
                let details = {
                  "id": result.id,
                  "name": result.first_name,
                  "email": result.email != null ? result.email : "",
                  "loginMedium": "facebook"
                }
                var loginDetails = {
                  "customerDetails": details
                }
                this._loginService.login(loginDetails);
              } else {
                //throw error that you cannot login through facebook , you need help.Serious Help.
              }
              if (result && !result.error) {
              }
            });
        }
      }));
    };

  }


  ngOnInit() {
    var navListItems = $('div.setup-panel div a'),
      allContent = $('.setup-content'),
      allNextBtn = $('.nextBtn');

    allContent.hide();

    navListItems.click(function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')),
        $item = $(this);

      if (!$item.hasClass('disabled')) {
        navListItems.removeClass('btn-success').addClass('btn-default');
        $item.addClass('btn-success');
        allContent.hide();
        $target.show();
        $target.find('input:eq(0)').focus();
      }
    });
    let self = this;
    allNextBtn.click(function () {
      var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url'],input[type='password'],input[type='email']"),
        isValid = true;

      $(".field-wrap").removeClass("has-error");
      for (var i = 0; i < curInputs.length; i++) {
        if (!curInputs[i].validity.valid) {
          isValid = false;
          $(curInputs[i]).closest(".field-wrap").addClass("has-error");
        }
      }
      if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
    });
    $('div.setup-panel div a.btn-success').trigger('click');
    this.loadScript();
    this.category = "seller";
    this.activeForm = "firstFormGroup";
  }
  formgroupValidator(form: any) {
    this.utils.validateAllFormFields(form);
  }

  register() {
    //.log(this.docuploadpath.data);
    this.activeForm = this.registrationFormGroup;
    if (this.activeForm.invalid) {
      return;
    }

    let imagepath = (this.docuploadpath == null || this.docuploadpath.data == null || this.docuploadpath.data.Location == null) ? "" : this.docuploadpath.data.Location;
    let customer = {
      "category": this.category,
      "name": this.firstFormGroup.controls["name"].value,
      "email": this.firstFormGroup.controls["email"].value,
      "password": this.firstFormGroup.controls["password"].value,
      "address": this.activeForm.controls["address"].value,
      "pincode": this.activeForm.controls["pincode"].value,
      "contact": this.activeForm.controls["contact"].value,
      "image": imagepath
    }
    let register = {
      "customerDetails": customer
    }

    console.log(register);
    if (this.activeForm.valid) {
      this._registrationService.registration(register);
    } else {

    }

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
      var dynamicScripts = ["../../assets/js/login.js"];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }
  login() {
    // let customer={
    //   "username" : this.formLogin.controls["emailFormControl"].value,
    //   "password" : this.formLogin.controls["passwordFormControl"].value
    // }
    // var loginDetails={
    //   "customerDetails" : customer
    // }
    let customer = "username=" + this.formLogin.controls["emailFormControl"].value +
      "&password=" + this.formLogin.controls["passwordFormControl"].value;
    if (this.formLogin.valid) {
      var loginStatus = this._loginService.login(customer);
    }
  }

  shouldShowErrors(fieldName, formName) {
    return this.utils.shouldShowErrors(fieldName, formName);
  }
  getErrorMessage(fieldName, formName) {
    return this.utils.getErrorMessage(fieldName, formName);
  }
  selectNextForm(event) {
    this.category = this.firstFormGroup.controls["categoryChoice"].value;
  }
  routeTo(path: String) {
    this.router.navigate(['/' + path]);
  }

  googleLogin() {
    window['gapi'].auth2.init({
      client_id: environment.googleClientId
    }).then(() => {
      let GoogleAuth = window['gapi'].auth2.getAuthInstance();
      GoogleAuth.signIn();
      GoogleAuth.isSignedIn.listen(this.updateSigninStatus);
    });
  }

  updateSigninStatus(data) {
    if (data) {
      let profileObj = window['gapi'].auth2.getAuthInstance().currentUser.get();
       profileObj = profileObj.getBasicProfile();
      if(profileObj.getId()){
          let details = {
            "id": profileObj.getId(),
            "name": profileObj.getName(),
            "email": profileObj.getEmail() != null ? profileObj.getEmail().email : "",
            "loginMedium": "google"
          }
          var loginDetails = {
            "customerDetails": details
          }
          this._loginService.login(loginDetails);
      }
      console.log('ID: ' + profileObj.getId());
      console.log('Full Name: ' + profileObj.getBasicProfile().getName());
      console.log('Given Name: ' + profileObj.getBasicProfile().getGivenName());
      console.log('Family Name: ' + profileObj.getBasicProfile().getFamilyName());
      console.log('Image URL: ' + profileObj.getBasicProfile()().getImageUrl());
      console.log('Email: ' + profileObj.getBasicProfile().getEmail());

    }
  }

}
