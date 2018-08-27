import { Component, OnInit } from '@angular/core';
import { AdminTemplateService } from './service/admin-template.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $;
@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  selectedFiles: FileList;
  images:any=[];
  bannerImages: any =[];
  promotionImages: any =[];
  oneCorouselImages: any =[];
  twoCorouselImages: any =[];
  threeCorouselImages: any =[];
  fourCorouselImages: any =[];
  ownerIds: any = [];
  products: any = [];
  index;
  activepanel;
  successStatus = null;
  uploadedImage = null;
  adminAssetForm = this._formBuilder.group({
    "name" : ['',],
    "ownerId": ['', ],
    "image" : ['',],
    "productsofowner" : ['',],
    "productName" : ['',],
    "startdate" : ['',],
    "enddate" : ['', ],
    "productID" : ['',],
    "html" : ['',],
    "id": ['',],
    "zoneID" :['',]
  }); 
  corouselForm =this._formBuilder.group({
    "zoneID" : ['',]
  });
  constructor(private _adminService : AdminTemplateService,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activepanel='banner';
    let self=this;
    this.uploadedImage=null;
    // this._adminService.getFiles(this.activepanel,function(data){
    //   self.populateData(self.activepanel,"GET",data, self);
    // }); 
    this._adminService.getOwnerIds().subscribe(ownerIds=>{
        this.ownerIds = ownerIds;
    });
    this._adminService.getasset().subscribe(assets=>{
      console.log(assets);
      assets.forEach( element => {
        if(element.category == 'banner'){
          self.populateData('banner', "GET", element, self);
        }
        if(element.category == 'promotion'){
          self.populateData('promotion', "GET", element, self);
        }
        if(element.category == 'corousel' && element.zoneId == '1'){
          self.populateData('1', "GET", element, self);
        }
        if(element.category == 'corousel' && element.zoneId == '2'){
          self.populateData('2', "GET", element, self);
        }
        if(element.category == 'corousel' && element.zoneId == '3'){
          self.populateData('3', "GET", element, self);
        }
        if(element.category == 'corousel' && element.zoneId == '4'){
          self.populateData('4', "GET", element, self);
        }
      });
    });
  }
  ngAfterViewInit(){
    
  }

  upload(input){
    let self = this;
    if(input =='corousel')
      this.activepanel= this.corouselForm.controls['zoneID'].value;
      this._adminService.uploadfile(this.selectedFiles,this.activepanel,function(data){
      if(data){
          self.adminAssetForm.controls['image'].setValue(data[0].Location); 
          self.uploadedImage = data[0].Location;
      }else{
        //raise alarm that upload could not be done
      }
    });  
  }
  
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  delete(imagepath, number, id){
    let image=imagepath;
    if(number == '1' || number == '2' || number == '3' || number == '4'){
      this.activepanel = number;
    }
    if(id!=null){
      let self=this;
      this._adminService.deleteAsset(id).subscribe(status=>{
        if(status){
          self.index =self.getArray().findIndex(i=> i.imageURL == image);
          console.log(self.index);
          let that=self;
          self._adminService.deletefile(image.split('/').slice(-1),self.activepanel,function(deleteStatus){
            if(deleteStatus ==true){  
              self.populateData(that.activepanel,"DELETE",null, that);
            }
          });
        }
      });
    }else{
      this.index =this.getArray().findIndex(i=> i.Location == image);
      console.log(this.index);
      let self = this;
      this._adminService.deletefile(image.split('/').slice(-1),this.activepanel,function(deleteStatus){
        console.log(deleteStatus);
        if(deleteStatus ==true){  
          self.populateData(self.activepanel,"DELETE",null, self);
        }
      });
    }
     
  }
  updatepanel(panel:String){
    if( panel == 'corousel'){
      this.corouselForm.controls['zoneID'].setValue("1");
      // this._adminService.getFiles('1',function(data){
      //   self.populateData('1',"GET",data, self);
      // });
      // this._adminService.getFiles('2',function(data){
      //   self.populateData('2',"GET",data, self);
      // });
      // this._adminService.getFiles('3',function(data){
      //   self.populateData('3',"GET",data, self);
      // });
      // this._adminService.getFiles('4',function(data){
      //   self.populateData('4',"GET",data, self);
      // });
      this.activepanel = 1;
    }else{
      this.activepanel = panel;
    }
    // let self = this;
    // this._adminService.getFiles(this.activepanel,function(data){
    //   self.populateData(self.activepanel,"GET",data, self);
    // });
  }
  populateData(activepanel,action,images, self){
    // if(action=="UPLOAD"){
    //   switch(activepanel){
    //     case 'banner':
    //       self.bannerImages= self.bannerImages.concat(images);
    //       break;
    //     case 'promotion':
    //       self.promotionImages= self.promotionImages.concat(images);
    //       break;
    //     case '1':
    //       self.oneCorouselImages= self.oneCorouselImages.concat(images);
    //       break;
    //     case '2':
    //       self.twoCorouselImages= self.twoCorouselImages.concat(images);
    //       break;
    //     case '3':
    //       self.threeCorouselImages= self.threeCorouselImages.concat(images);
    //       break;
    //     case '4':
    //       self.fourCorouselImages= self.fourCorouselImages.concat(images);
    //   }
    // }
    if(action == "DELETE"){
      switch(activepanel){
        case 'banner':
          self.bannerImages= self.bannerImages.splice(0,self.index).concat(self.bannerImages.splice(self.index+1,self.bannerImages.length));
          break;
        case 'promotion':
        self.promotionImages= self.promotionImages.splice(0,self.index).concat(self.promotionImages.splice(self.index+1,self.promotionImages.length));
          break;
        case '1':
          self.oneCorouselImages= self.oneCorouselImages.splice(0,self.index).concat(self.oneCorouselImages.splice(self.index+1,self.oneCorouselImages.length));
          break;
        case '2':
          self.twoCorouselImages= self.twoCorouselImages.splice(0,self.index).concat(self.twoCorouselImages.splice(self.index+1,self.twoCorouselImages.length));
          break;
        case '3':
          self.threeCorouselImages= self.threeCorouselImages.splice(0,self.index).concat(self.threeCorouselImages.splice(self.index+1,self.threeCorouselImages.length));
          break;
        case '4':
          self.fourCorouselImages= self.fourCorouselImages.splice(0,self.index).concat(self.fourCorouselImages.splice(self.index+1,self.fourCorouselImages.length));
      }
    }
    if(action == "GET"){
      switch(activepanel){
        case 'banner':
          self.bannerImages.push(images);
          break;
        case 'promotion':
          self.promotionImages.push(images);
          break;
        case '1':
          self.oneCorouselImages.push(images);
          break;
        case '2':
          self.twoCorouselImages.push(images);
          break;
        case '3':
          self.threeCorouselImages.push(images);
          break;
        case '4':
          self.fourCorouselImages.push(images);
      }
    }
  }
  getArray(): any{
    switch(this.activepanel){
      case 'banner':
        return this.bannerImages;
      case 'promotion':
        return this.promotionImages;
      case '1':
        return this.oneCorouselImages;
      case '2':
        return this.twoCorouselImages;
      case '3':
        return this.threeCorouselImages;
      case '4':
        return this.fourCorouselImages;
    }
  }
  openModal(){
    $('#adminNewModal').modal();
    setTimeout(() => {
      $('.myeditor').wymeditor();
    }, 100);
    
  }
  populateProducts(product = null){
    this.products = [];
    let self=this;
    this._adminService.getProductOfOwner(this.adminAssetForm.controls['ownerId'].value).subscribe(products=>{
      self.products = products;
      if(product!= null){
        self.adminAssetForm.controls['productID'].setValue(product);
      }
    });
  }
  populateProductID(){
    this.adminAssetForm.controls['productID'].setValue(this.adminAssetForm.controls['productsofowner'].value);
  }
  saveasset(){
    this.successStatus=null;
    if(this.adminAssetForm.controls['image'].value == null){
      console.log("No Images");
      return;
    }
    if(this.adminAssetForm.valid){
      let adminAssets={
        "imageURL" : this.adminAssetForm.controls['image'].value,
        "sellerID" :  this.adminAssetForm.controls['ownerId'].value,
        "productID" : this.adminAssetForm.controls['productID'].value,
        "html" : this.adminAssetForm.controls['html'].value,
        "target" : this.adminAssetForm.controls['productID'].value ==null ? "category": this.adminAssetForm.controls['productID'].value,
        "startDate" : this.adminAssetForm.controls['startdate'].value,
        "endDate" : this.adminAssetForm.controls['enddate'].value,
        "name" : this.adminAssetForm.controls['name'].value,
        "category" :  this.activepanel == '1' || this.activepanel == '2' || this.activepanel == '3' || this.activepanel == '4'? 'corousel' : this.activepanel,
        "active" : 1,
        "id" : this.adminAssetForm.controls['id'].value ==''? null: this.adminAssetForm.controls['id'].value,
        "zoneId" : this.activepanel == '1' || this.activepanel == '2' || this.activepanel == '3' || this.activepanel == '4'? this.corouselForm.controls['zoneID'].value : this.adminAssetForm.controls['zoneID'].value
      }
      let product=this.products.filter(element => element.productId == this.adminAssetForm.controls['productID'].value );
      adminAssets['productName'] = product[0].productName;
      adminAssets['productNewPrice'] = product[0].specs.productPrice;
      adminAssets['productOldPrice'] = product[0].specs.productOldPrice ==null ? 0.0 : product[0].specs.productOldPrice ;

      if(adminAssets){
        let self = this;
        this._adminService.addasset(adminAssets).subscribe(status=>{
          if(status){
            // self._adminService.getFiles(self.activepanel,function(data){
            //   self.populateData(self.activepanel,"GET",this.adminAssetForm.controls['image'].value, self);
            // });
            this.successStatus = true;
            $('#adminNewModal').modal('hide');
            this.bannerImages=[];
            this.promotionImages=[];
            this.oneCorouselImages=[];
            this.twoCorouselImages=[];
            this.threeCorouselImages=[];
            this.fourCorouselImages=[];
            this._adminService.getasset().subscribe(assets=>{
                console.log(assets);
                this.clear();
                assets.forEach(element => {
                if(element.category == 'banner'){
                  
                  self.populateData('banner', "GET", element, self);
                }
                if(element.category == 'promotion'){
                  self.populateData('promotion', "GET", element, self);
                }
                if(element.category == 'corousel' && element.zoneId == '1'){
                  self.populateData('1', "GET", element, self);
                }
                if(element.category == 'corousel' && element.zoneId == '2'){
                  self.populateData('2', "GET", element, self);
                }
                if(element.category == 'corousel' && element.zoneId == '3'){
                  self.populateData('3', "GET", element, self);
                }
                if(element.category == 'corousel' && element.zoneId == '4'){
                  self.populateData('4', "GET", element, self);
                }
              });
            });
          }else{
            if(self.adminAssetForm.controls['id'].value == null){ // this means this is  an update
              self.delete(this.adminAssetForm.controls['image'].value, this.activepanel,null);
              this.successStatus = false;
            }
          }
        });
        //async  this._adminService.addasset(adminAssets).subscribe(status=>{
      }
    }
  }
  update(category: String,id: String){
    $('#adminNewModal').modal('show');
    let self = this;
    setTimeout(() => {
      let asset = null;
      if(category == 'banner'){
        asset= self.bannerImages.filter(i=> i.id == id);
      }
      if(category == 'promotion'){
        asset= self.promotionImages.filter(i=> i.id == id);
      }
      if(category == '1'){
        asset= self.oneCorouselImages.filter(i=> i.id == id);
      }
      if(category == '2'){
        asset= self.twoCorouselImages.filter(i=> i.id == id);
      }
      if(category == '3'){
        asset= self.threeCorouselImages.filter(i=> i.id == id);
      }
      if(category == '4'){
        asset= self.fourCorouselImages.filter(i=> i.id == id);
      }

      self.adminAssetForm.controls['name'].setValue(asset[0].name);
      self.adminAssetForm.controls['image'].setValue(asset[0].imageURL);
      self.uploadedImage =  asset[0].imageURL;
      self.adminAssetForm.controls['ownerId'].setValue(asset[0].sellerID);
      self.populateProducts(asset[0].productID);
      self.adminAssetForm.controls['html'].setValue(asset[0].html);
      self.adminAssetForm.controls['productsofowner'].setValue(asset[0].target);
      self.adminAssetForm.controls['startdate'].setValue(asset[0].startDate);
      self.adminAssetForm.controls['enddate'].setValue(asset[0].endDate);
      self.adminAssetForm.controls['id'].setValue(asset[0].id);
      if(category == 'banner' || category == 'promotion'){
        self.adminAssetForm.controls['zoneID'].setValue(asset[0].zoneId);
      }else{
        self.corouselForm.controls['zoneID'].setValue(asset[0].zoneId);
      }
    }, 1000);
    

  }
  clear(){
    this.bannerImages=[];
    this.promotionImages=[];
    this.oneCorouselImages=[];
  }
}
//if closing the modal after uploading image, then image has to be deleted