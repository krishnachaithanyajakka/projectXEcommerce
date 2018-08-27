import { Component, OnInit } from '@angular/core';
import { UploadserviceService } from '../doc-upload/uploadservice.service';

import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})
export class AvatarUploadComponent implements OnInit {

  selectedFiles: FileList;
  constructor(private _uploadService : UploadserviceService) { }

  ngOnInit() {
    let self=this;
    $("#imageUpload").change(function() {
      self.readURL(this);
      self.selectedFiles = this.target.files;
      const file = self.selectedFiles.item(0);
      // Promise.resolve(self._uploadService.uploadfile(file,function(){}))
      // .then(
      //   data=>{
      //     this.data=data;
      //     console.log("DocUploadComponent:::"+ this.data);
      //   });   
       });
  }

  readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            //$('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
  }

}
