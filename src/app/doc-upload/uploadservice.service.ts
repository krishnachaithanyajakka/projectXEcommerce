import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class UploadserviceService {

  FOLDER = 'jsa-s3/';
  constructor() { }
  
  uploadfile(file):Promise<any> {
 
    const bucket = new S3(
      {
        accessKeyId: 'AKIAJ7UR4XXFK2NBXIJA',
        secretAccessKey: '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',
        region: 'us-east-1'
      }
    );
 
    const params = {
      Bucket: 'projectxassets',
      Key: this.FOLDER + file.name,
      Body: file,
      ACL:    "public-read"
    };
    const params1 = {
      Bucket: 'projectxassets',
      Key: this.FOLDER + file.name
    };
    
    return new Promise ( 
      (resolve,reject) =>{
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
        resolve(data);
      });
      })
    
    
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
