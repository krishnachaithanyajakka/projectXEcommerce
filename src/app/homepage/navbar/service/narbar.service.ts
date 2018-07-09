import { Injectable } from '@angular/core';
import { AjaxService } from '../../../services/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class NarbarService {

  isLoggedIn: boolean;
  constructor(private _ajaxService: AjaxService) { }

  setUserIsLoggedIn(loginStatus){
    this.isLoggedIn= loginStatus;
  }
  getUserIsLoggedIn(){
    return this.isLoggedIn;
  }

  searchProduct(_item: String){
    Promise.resolve(this._ajaxService.searchProduct(_item))
    .then(products => {
      return products;
    },
      SystemError => {
    });
  }
}
