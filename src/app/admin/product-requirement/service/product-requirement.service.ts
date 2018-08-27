import { Injectable } from '@angular/core';
import { AjaxService } from '../../../services/ajax.service';
import { AwssettingsService } from '../../../services/awssettings.service';
@Injectable({
  providedIn: 'root'
})
export class ProductRequirementService {
  bucketpath = "productImages/";
  private uploadParams = {
    Bucket: this._awsService.getBucketName(),
    Key: ''
  };
  constructor(private _ajaxService : AjaxService,
              private _awsService : AwssettingsService) { }


  registerProduct(productDetails: any){
    return this._ajaxService.registerProduct(productDetails);
  }
  uploadfile(files,callback){
    this._awsService.uploadfile(this.uploadParams,this.bucketpath, files,function(data){
      callback(data);
    });
  }
}
