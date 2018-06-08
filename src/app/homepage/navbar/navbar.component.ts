import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  formLogin = this.formBuilder.group({
    'emailFormControl': ['', [Validators.required, Validators.email]],
    'passwordFormControl' : ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
