import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { DocUploadComponent } from '../doc-upload/doc-upload.component';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css',
              '../../assets/css/login.css']
})
export class RegistrationComponent implements OnInit {
  isLinear = false;
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    address: ['', Validators.required],
    pincode: ['', Validators.required],
    contact: ['', Validators.required]
  });
  
  @ViewChild(DocUploadComponent) docuploadpath;
  constructor(private _formBuilder: FormBuilder,
              private _registrationService : RegistrationService) { }

  
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

    allNextBtn.click(function () {

        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url'],input[type='password'],input[type='email']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
    });
    $('div.setup-panel div a.btn-success').trigger('click');
    this.loadScript();
  }

  register(){
    console.log(this.docuploadpath.data);
    let imagepath= (this.docuploadpath ==null || this.docuploadpath.data==null || this.docuploadpath.data.Location ==null) ? "": this.docuploadpath.data.Location;
    let customer={
      "name" : this.firstFormGroup.controls["name"].value,
      "email" : this.firstFormGroup.controls["email"].value,
      "password" : this.firstFormGroup.controls["password"].value,
      "address" : this.secondFormGroup.controls["address"].value,
      "pincode" : this.secondFormGroup.controls["pincode"].value,
      "contact" : this.secondFormGroup.controls["contact"].value,
      "image" : imagepath
    }
    let register={
      "customerDetails" : customer
    }
    
    console.log(register);
    if(this.firstFormGroup.valid && this.secondFormGroup.valid ){
      this._registrationService.registration(register);
    }else{

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
