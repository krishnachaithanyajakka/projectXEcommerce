import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;
@Component({
  selector: 'app-applicant-colousel',
  templateUrl: './applicant-colousel.component.html',
  styleUrls: ['./applicant-colousel.component.css']
})
export class ApplicantColouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     // manual carousel controls
     $('.next').click(function() { $('.carousel').carousel('next');
     return false; });
     $('.prev').click(function() { $('.carousel').carousel('prev');
     return false; });
  }

}
