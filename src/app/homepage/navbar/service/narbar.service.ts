import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NarbarService {

  isLoggedIn: boolean;
  constructor() { }

  setUserIsLoggedIn(loginStatus){
    this.isLoggedIn= loginStatus;
  }
  getUserIsLoggedIn(){
    return this.isLoggedIn;
  }

}
