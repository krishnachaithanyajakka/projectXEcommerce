import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductRequirementService } from './service/product-requirement.service';
import {UserdetailsService} from '../../services/userdetails.service';
import { ProductService } from '../product/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-product-requirement',
  templateUrl: './product-requirement.component.html',
  styleUrls: ['./product-requirement.component.css']
})
export class ProductRequirementComponent implements OnInit {

  productCondition= 'new';
  images : any[];
  selectedFiles: FileList;
  productFormGroup = this._formBuilder.group({
    "productId": ['', ],
    "productCompany": ['', []],
    "productName": ['', ],
    "productOwnerId":['',],
    "productListId": ['', ],
    "productStatus": ['', []],
    "productCondition": ['', ],
    "purchaseYear": ['', ],
    "productQuantity": ['', []],
    "specs" : this._formBuilder.group({
      "manfactureYear":['',],
      "productWeight": ['', ],
      "productPrice":['',],
      "productDesc":['',],
      "productOldPrice": ['',]
    })  
  });
 
  constructor(private _formBuilder: FormBuilder,
              private _productRequirementService : ProductRequirementService,
              private _userdetailsService: UserdetailsService,
              private _activatedRoute : ActivatedRoute,
              private _productService : ProductService,
              private _router : Router) { }

  ngOnInit() {
    let customer = this._userdetailsService.getCustomerData();
    this.productFormGroup.controls["productOwnerId"].setValue(customer.id);
    let self = this;
    this._activatedRoute.params.subscribe(params => {
      let productId = params['id'];
      _.each(this._productService.getProductList(),function(products,index){
        if(products["productId"] == productId){
            self.productFormGroup.controls['productId'].setValue(products["productId"]);
            self.productFormGroup.controls['productCompany'].setValue(products["productCompany"]);
            self.productFormGroup.controls['productName'].setValue(products["productName"]);
            self.productFormGroup.controls['productOwnerId'].setValue(products["productOwnerId"]);
            self.productFormGroup.controls['productListId'].setValue(products["productGroupId"]);
            self.productFormGroup.controls['productStatus'].setValue(products["productStatus"]);
            self.productFormGroup.controls['productCondition'].setValue(products["productCondition"]);
            self.productFormGroup.controls['productQuantity'].setValue(products["productQuantity"]);
            self.productFormGroup.get('specs').get('manfactureYear').setValue(products["specs"]["manfactureYear"]);
            self.productFormGroup.get('specs').get('productWeight').setValue(products["specs"]["productWeight"]);
            self.productFormGroup.get('specs').get('productPrice').setValue(products["specs"]["productPrice"]);
            self.productFormGroup.get('specs').get('productDesc').setValue(products["specs"]["productDesc"]);
            self.productFormGroup.get('specs').get('productOldPrice').setValue(products["specs"]["productOldPrice"]);
            self.images = products["specs"]["images"];
        }
      })
    });
    
  }

  saveProduct(){
    if(this.productFormGroup.valid){
      console.log(this.productFormGroup.value);
      var productDetails={
        "product" : this.productFormGroup.value
      }
      productDetails["product"]["productId"] = productDetails["product"]["productId"] == "" ? null : productDetails["product"]["productId"];
      productDetails["product"]["specs"]['images'] = this.images;
      // this._productRequirementService.registerProduct(productDetails);
      let self = this;
      this._productRequirementService.registerProduct(productDetails).subscribe((productDetails:any)=>{
        self._router.navigate(['product-account']);
        console.log("Customer Status::"+ productDetails);
      });
    }
  }
  changeStatus(){
    this.productCondition = this.productFormGroup.controls['productStatus'].value;
  }
  upload(){
    let self = this;
    this._productRequirementService.uploadfile(this.selectedFiles,function(data){
      self.images=[];
      if(data){
          _.each(data,function(product,index){
            self.images.push(product.Location);
          });
      }else{
        //raise alarm that upload could not be done
      }
    });  
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
