import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // $('.slider .item').each(function () {
    //   let next = $(this).next();
    //   if (!next.length) {
    //     next = $(this).siblings(':first');
    //   }
    //   next.children(':first-child').clone().appendTo($(this));
    //   if (next.next().length > 0) {
    //     next.next().children(':first-child').clone().appendTo($(this));
    //   } else {
    //     $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    //   }
    // });
    $('.slider .item').each(function() {
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
