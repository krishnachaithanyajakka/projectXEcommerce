import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoginemitterService {
  private loginEvent =new BehaviorSubject<Boolean>(false);
  loginEvent$= this.loginEvent.asObservable();

  constructor() { }

  broadcastLoginEvent(bool: boolean){
    this.loginEvent.next(bool);
    
  }

}
