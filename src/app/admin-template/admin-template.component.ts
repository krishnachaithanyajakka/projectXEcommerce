import { Component, OnInit } from '@angular/core';
import { AdminTemplateService } from './service/admin-template.service';
@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  selectedFiles: FileList;
  images:any=[];
  constructor(private _uploadService : AdminTemplateService) { }

  ngOnInit() {
    let self=this;
    this._uploadService.getFiles('promotions',function(data){
      self.images=data;
      console.log(self.images);
    }); 
  }

  upload(input) {
    let self = this;
    this._uploadService.uploadfile(this.selectedFiles,'promotions',function(data){
      self.images=data;
      console.log(self.images);
    });  
  }
  
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
