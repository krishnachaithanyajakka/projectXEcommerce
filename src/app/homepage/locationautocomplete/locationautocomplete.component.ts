import { Directive,ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import {NgModel} from '@angular/forms';

declare var google:any;

@Directive({
  selector: '[Googleplace]',
  providers: [NgModel],
  host: {
    '(input)' : 'onInputChange()'
  }
})

export class LocationautocompleteDirective implements OnInit {

  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  modelValue:any;
  autocomplete:any;
  lat:any;
  lng:any;
  private _el:HTMLElement;
  el;

  constructor(el: ElementRef,private model:NgModel) {
    this.el=el;
    
  }
  ngOnInit(){
    this._el = this.el.nativeElement;
    this.modelValue = this.model;
    var input = this._el;

    this.autocomplete = new google.maps.places.Autocomplete(input, {});
    google.maps.event.addListener(this.autocomplete, 'place_changed', ()=> {
      var place = this.autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place:Object) {
    this.setAddress.emit(place);
  }

  onInputChange() {
    console.log(this.model);
  }
}
