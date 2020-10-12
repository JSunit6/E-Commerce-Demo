import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { Productcategories } from '../../models/productcategories';
import { ProductsService } from '../../services/products.service';
import { ProductcategoriesService } from '../../services/productcategories.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styles: [
  ]
})
export class AddproductsComponent implements OnInit {

  productToAdd: Product;
  addProductForm: FormGroup;
  productCategories: Productcategories[];

  constructor(private formBuilder: FormBuilder, private productCategoriesService: ProductcategoriesService) { }

  ngOnInit(): void {
    
    this.addProductForm = this.formBuilder.group({
      ProductName : ['', Validators.required],
      ProductBrand: ['', Validators.required],
      ProductQty: ['', Validators.required],
      ProductPrice: ['',Validators.required],
      ProductCategory: ['', Validators.required]
    });

    this.productCategoriesService.getProductCategories().subscribe(
      (data)=> {this.productCategories = data},
      (err) => {console.log(err)}
    );

  }

}
