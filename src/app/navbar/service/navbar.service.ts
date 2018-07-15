import { Injectable } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  isLoggedIn: boolean;
  constructor(private _ajaxService: AjaxService) { }

  setUserIsLoggedIn(loginStatus){
    this.isLoggedIn= loginStatus;
  }
  getUserIsLoggedIn(){
    return this.isLoggedIn;
  }
}
