import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;
@Component({
  selector: 'app-vertical-slider',
  templateUrl: './vertical-slider.component.html',
  styleUrls: ['./vertical-slider.component.css']
})
export class VerticalSliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.carousel .vertical .item').each(function() {
      let next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      for (let i = 1; i < 3; i++) {
        next = next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
      }
    });
  }

}
