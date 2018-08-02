import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoginemitterService {
  
  private loginEvent = new BehaviorSubject<Boolean>(false);
  loginEvent$= this.loginEvent.asObservable();

  private navFootHideEvent = new BehaviorSubject<Boolean>(false);
  navFootHideEvent$ = this.navFootHideEvent.asObservable();

  constructor() { }

  broadcastLoginEvent(bool: boolean){
    this.loginEvent.next(bool);  
  }
  broadcastNavFootHideEvent(bool: boolean){
    this.navFootHideEvent.next(bool);
  }
}
