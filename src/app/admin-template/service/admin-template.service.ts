import { Injectable } from '@angular/core';
import { AwssettingsService } from '../../services/awssettings.service';
import { AjaxService } from '../../services/ajax.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminTemplateService {
  bucket_path = '';

  private uploadParams = {
    Bucket: this.awsService.getBucketName(),
    Key: ''
  };
  
  private getParams = {
    Bucket: this.awsService.getBucketName(),
    // Prefix: 'promotions'
  };
  private deleteParams = {
    Bucket: this.awsService.getBucketName(),
    Key : ''
  };
  constructor(private awsService : AwssettingsService,
              private ajaxService : AjaxService) { }

  uploadfile(file,type,callback){
    this.awsService.uploadfile(this.uploadParams,this.bucketpath(type), file,function(data){
      callback(data);
    });
  }
  getFiles(type,callback){
    this.getParams['Prefix'] = this.bucketpath(type);
    this.awsService.getFiles(this.getParams,function(data){
      callback(data);
    });
  }
  
  deletefile(image,type,callback){
    this.awsService.deleteFile(image,this.deleteParams,this.bucketpath(type),function(data){
      callback(data);
    });
  }
  bucketpath(type: string): string{
    let bucket_path;
    switch(type){
      case 'promotion':
        bucket_path = 'promotion/';
        break;
      case 'banner':
        bucket_path = 'banner/homepage/';
        break;
      case 'middlepage':
        bucket_path = 'banner/middlepage';
        break;
      case '1':
        bucket_path = 'corousel/1/';
        break;
      case '2':
        bucket_path = 'corousel/2/';
        break;
      case '3':
        bucket_path = 'corousel/3/';
        break;
      case '4':
        bucket_path = 'corousel/4/';
        break;
      default:
        bucket_path = this.awsService.getBucketName();
    }
    return bucket_path;
  }
  getOwnerIds(): Observable<any>{
    return this.ajaxService.getOwnerIds();
  }
  getProductOfOwner(ownerId : String) : Observable<any>{
    return this.ajaxService.getProductOfOwner(ownerId);
  }
  addasset(admin : any){
    return this.ajaxService.addasset(admin);
  }
  getasset(){
    return this.ajaxService.getasset();
  }
  deleteAsset(id){
    return this.ajaxService.deleteAsset(id);
  }
}
