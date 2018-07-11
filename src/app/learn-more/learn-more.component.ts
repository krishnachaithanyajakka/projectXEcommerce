import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.css']
})
export class LearnMoreComponent implements OnInit {

  activepanel:String ="deals"
  constructor() { }

  ngOnInit() {
  }
  updatepanel(tab: String){
    this.activepanel=tab;
  }

}
