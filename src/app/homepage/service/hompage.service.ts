import { Injectable } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class HompageService {

  constructor(private _ajaxService: AjaxService) { }

  getBanner(zoneId: String){
    return this._ajaxService.getBanner(zoneId);
  }
}
