import { Component, OnInit } from '@angular/core';
import { AdminTemplateService } from './service/admin-template.service';
@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  selectedFiles: FileList;
  data;
  constructor(private _uploadService : AdminTemplateService) { }

  ngOnInit() {
    let self=this;
  }

  upload(input) {
    const file = this.selectedFiles.item(0);
    Promise.resolve(this._uploadService.uploadfile(file))
    .then(
      data=>{
        this.data=data;
        console.log("DocUploadComponent:::"+ this.data);
      });    
  }
  
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
