import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductRequirementService } from './service/product-requirement.service';

@Component({
  selector: 'app-product-requirement',
  templateUrl: './product-requirement.component.html',
  styleUrls: ['./product-requirement.component.css']
})
export class ProductRequirementComponent implements OnInit {

  productFormGroup = this._formBuilder.group({
    "productId": ['', ],
    "productDisplayName": ['', []],
    "productOwnerId": ['', ],
    "productListId":['',],
    "quantity": ['', ],
    "productWeight": ['', []],
    "productSize": ['', ],
    "productArea":['',],
    "productExpiryDate": ['', ],
    "productCategory": ['', []],
    "productType": ['', ],
    "productDesc":['',]
  });
  constructor(private _formBuilder: FormBuilder,
              private _productRequirementService : ProductRequirementService) { }

  ngOnInit() {
  }

  saveProduct(){
    if(this.productFormGroup.valid){
      console.log(this.productFormGroup.value);
      var productDetails={
        "product" : this.productFormGroup.value
      }
      
      this._productRequirementService.registerProduct(productDetails);
    }
  }
}
