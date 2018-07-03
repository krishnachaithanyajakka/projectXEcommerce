import { Component, OnInit } from '@angular/core';
import { UploadserviceService } from './uploadservice.service';

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.css']
})
export class DocUploadComponent implements OnInit {

  selectedFiles: FileList;
  constructor(private _uploadService : UploadserviceService) { }

  ngOnInit() {
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this._uploadService.uploadfile(file);
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
