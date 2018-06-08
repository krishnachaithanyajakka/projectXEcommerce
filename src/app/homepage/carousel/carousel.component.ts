import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
