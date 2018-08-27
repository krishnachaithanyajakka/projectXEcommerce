import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {awsKey} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AwssettingsService {
  picture_arr: any=[];
  bucketname:String ='projectxecommerce';

  constructor() { }
  private bucket = new S3({
    accessKeyId: awsKey.accessKeyId,
    secretAccessKey: awsKey.secretAccessKey,
    region: 'us-east-1'
  });

  getBucketName(){
    return this.bucketname;
  }

  uploadfile(params,bucket_path,file,callback){
    return new Promise((resolve,reject)=>{
      for(let i =0;i< file.length;i++){
        params['Key'] = bucket_path + file[i].name;
        params['Body']= file[i];
        let self=this;
        this.picture_arr=[];
        this.bucketloader(params, i,file, self,function(data){
          if(data !=null)
            callback(data);
          else
            callback(null);
        });        
      }
    });
  }

  getFiles(params,callback){
    let self=this;
    this.bucket.listObjects(params,function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      if(data){
        self.picture_arr = [];
        console.log('Successfully uploaded file.', data);
        for(var i=1;i<data.Contents.length;i++){
          self.picture_arr[i-1]={
            "Location" : "https://projectxecommerce.s3-ap-southeast-1.amazonaws.com/"+data.Contents[i].Key
          }
        }
        callback(self.picture_arr);
      }
    });
  }
  
  deleteFile(image,params,bucket_path,callback){
    let self=this;
    params['Key']= bucket_path+image;
    this.bucket.deleteObject(params,function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      callback(true);
    });
  }

  bucketloader(param: any, i: number, file : any, self:any, callback):any {
    this.bucket.upload(param, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      self.picture_arr.push(data);
      if(self.picture_arr.length ==file.length){
        callback(self.picture_arr);
      }
    });
  }
}
