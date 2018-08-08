import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class AdminTemplateService {
  picture_arr: any=[];
  bucket_path = '';
  gameCallQueue = [];

  private bucket = new S3({
      accessKeyId: 'AKIAIHPRAV44TVEKB5MQ',
      secretAccessKey: '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',
      region: 'us-east-1'
    });

  private params = {
    Bucket: 'projectxecomm',
    Key: '',
    ACL:    "public-read"
  };
  
  private params1 = {
    Bucket: 'projectxecomm',
    Key: ''
  };
  constructor() { }

  uploadfile(file,type,callback){
    switch(type){
      case 'promotions':
        this.bucket_path = 'promotions/';
        break;
      case 'banner':
        this.bucket_path = 'promotions/';
        break;
      default:
        this.bucket_path = 'projectxecomm';
    }
    return new Promise((resolve,reject)=>{
      for(let i =0;i< file.length;i++){
        this.params1['Key']=this.bucket_path + file[i];
        this.params['Key']= this.bucket_path + file[i].name;
        this.params['Body']= file[i];
        console.log(this.params1);
        console.log(this.params);
        let self=this;
        this.bucketloader(this.params, i,file, self,function(){
          console.log("Inside Callback function()");
            console.log(self.picture_arr);
            callback(self.picture_arr);
            return self.picture_arr;
        });        
      }
    });
  }
  bucketloader(param: any, i: number, file : any, self:any, callback):any {
    this.bucket.upload(param, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      self.picture_arr[i]=data;
      if(i+1==file.length){
        callback();
      }
    });
  }
  getFiles(type,callback){
    switch(type){
      case 'promotions':
        this.bucket_path = 'promotions/';
        break;
      case 'banner':
        this.bucket_path = 'promotions/';
        break;
      default:
        this.bucket_path = 'projectxecomm';
    }
    let self=this;
    this.bucket.getObject(this.params1,function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      self.picture_arr=data;
      callback(self.picture_arr);
    });
  }
}
