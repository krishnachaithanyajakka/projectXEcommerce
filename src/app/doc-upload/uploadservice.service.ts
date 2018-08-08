import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { resolve } from 'dns';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadserviceService {

  picture_arr: any=[];
  FOLDER = 'promotions/';
  gameCallQueue = [];
  private bucket = new S3(
    {
      accessKeyId: 'AKIAIHPRAV44TVEKB5MQ',
      secretAccessKey: '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',
      region: 'us-east-1'
    }
  );

  private params = {
    Bucket: 'projectxecomm',
    Key: '',
    ACL:    "public-read"
  };
  private params1 = {
    Bucket: 'projectxassets'
  };
  constructor() { }
  uploadfile(file,callback){
    return new Promise((resolve,reject)=>{
      for(let i =0;i< file.length;i++){
        this.params1['Key']=this.FOLDER + file[i];
        this.params['Key']= this.FOLDER + file[i].name;
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
        // await Promise.all([ this.bucketloader(this.params, i,file, self)]);
        
      }
      // Promise.all(this.gameCallQueue).then(
      //   gamesAndFavData =>{
      //     resolve(gamesAndFavData);
      // });
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
  async uploadfile1(file):Promise<any> {
 
    const bucket = new S3(
      {
        accessKeyId: 'AKIAIHPRAV44TVEKB5MQ',
        secretAccessKey: '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',
        region: 'us-east-1'
      }
    );
 
    const params = {
      Bucket: 'projectxecomm',
      Key: '',
      ACL:    "public-read"
    };
    const params1 = {
      Bucket: 'projectxassets'
    };

    // for(let i =0;i< file.length;i++){
    //   let self=this;
    //   params1['Key']=this.FOLDER + file[i];
    //   params['Key']= this.FOLDER + file[i].name,
    //   params['Body']= file[i],
    //   console.log(params1);
    //   console.log(params);
    //   await bucket.upload(params, function (err, data) {
    //     if (err) {
    //       console.log('There was an error uploading your file: ', err);
    //       return false;
    //     }
    //     console.log('Successfully uploaded file.', data);
    //     //For getting the file if the file is private
    //     // bucket.getObject(params1, function (err, data) {
    //     //   if (err) {
    //     //     console.log('There was an error uploading your file: ', err);
    //     //     return false;
    //     //   };
    //     // });
    //     //resolve(data);
    //     self.picture_arr[i]=data;
    //     if(self.picture_arr.length==file.length){
    //      this.picture_arr;
    //      return new Promise ( 
    //         (resolve,reject) =>{
    //           console.log(this.picture_arr);
    //           return this.picture_arr;
    //       });
    //     }else{
    //       console.log("file nopt");
    //     }
    //   });
      
    // }

        for(let i =0;i< file.length;i++){
          let self=this;
          params1['Key']=this.FOLDER + file[i];
          params['Key']= this.FOLDER + file[i].name;
          params['Body']= file[i];
          console.log(params1);
          console.log(params);
        bucket.upload(params, function (err, data) {
          if (err) {
            console.log('There was an error uploading your file: ', err);
            return false;
          }
          console.log('Successfully uploaded file.', data);
          //For getting the file if the file is private
          // bucket.getObject(params1, function (err, data) {
          //   if (err) {
          //     console.log('There was an error uploading your file: ', err);
          //     return false;
          //   };
          // });
          //resolve(data);
          self.picture_arr[i]=data;
          if(self.picture_arr.length==file.length){
            console.log(self.picture_arr);
            return self.picture_arr;
          }else{
            console.log("file nopt");
          }
        });
      }
    
    // return Promise.resolve(bucket.upload(params, function (err, data) {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     return false;
    //   }
 
    //   console.log('Successfully uploaded file.', data);
    //   //For getting the file if the file is private
    //   // bucket.getObject(params1, function (err, data) {
    //   //   if (err) {
    //   //     console.log('There was an error uploading your file: ', err);
    //   //     return false;
    //   //   };
    //   // });
    //   if(data == null){
    //     return null;
    //   }
    //   return data;
    // })).then(
    //   data =>{
    //     return data;
    //   }
    // )

    
  }

//   function myCtrl($scope, $timeout) {    
//     AWS.config.update({
//       accessKeyId: 'YOUR_ACCESS_TOKEN', 
//       secretAccessKey: 'YOUR_SECRET'
//     });
//     AWS.config.region = "YOUR_REGION";
//     var bucket = new S3({params: {Bucket: 'YOUR_BUCKET'}});

//     bucket.getObject({
//       Key: 'happy-face.jpg'
//     },function(err,file){

//     $timeout(function(){
//         $scope.s3url = "data:image/jpeg;base64," + encode(file.Body);
//     },1);
// });
// }

// function encode(data)
// {
//     var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
//     return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
// }
}
