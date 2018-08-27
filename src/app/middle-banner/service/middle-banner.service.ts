import { Injectable } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class MiddleBannerService {

  constructor(private _ajaxService : AjaxService) { }

  getCorousel(zoneId: String){
    return this._ajaxService.getCorousel(zoneId);
  }
}
