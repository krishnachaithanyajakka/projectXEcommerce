import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-category-tabs',
  templateUrl: './category-tabs.component.html',
  styleUrls: ['./category-tabs.component.css']
})
export class CategoryTabsComponent implements OnInit {

  @ViewChild('itemDescModal') itemModal;
  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.itemModal.nativeElement.className = 'modal fade show';
  }
}
