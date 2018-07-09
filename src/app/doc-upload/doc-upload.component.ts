import { Component, OnInit } from '@angular/core';
import { UploadserviceService } from './uploadservice.service';

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.css']
})
export class DocUploadComponent implements OnInit {

  selectedFiles: FileList;
  data;
  constructor(private _uploadService : UploadserviceService) { }

  ngOnInit() {
  }

  upload() {
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
