import { Component, OnInit } from '@angular/core';
import { UploadserviceService } from './uploadservice.service';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.scss']
})
export class DocUploadComponent implements OnInit {

  selectedFiles: FileList;
  data;
  constructor(private _uploadService : UploadserviceService) { }

  ngOnInit() {
    let self=this;
  }

  upload(input) {
    const file = this.selectedFiles;
    let self=this;
    // this.data= await this._uploadService.uploadfile(file);
    // console.log("DocUploadComponent :::"+ this.data);
    this._uploadService.uploadfile(file,function(data){
      self.data=data;
      console.log(self.data);
    });
    // Promise.resolve(this._uploadService.uploadfile(file))
    // .subscribe(
    //   data=>{
    //     this.data=data;
    //     console.log("DocUploadComponent:::"+ this.data);
    //   });    
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
