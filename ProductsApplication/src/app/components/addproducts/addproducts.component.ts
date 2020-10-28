import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { Productcategories } from '../../models/productcategories';
import { ProductcategoriesService } from '../../services/productcategories.service';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  productToAdd: Product;
  addProductForm: FormGroup;
  productCategories: Productcategories[];
  products: Product[];
  productBrands: string[];
  productNames: string[];

  constructor(private formBuilder: FormBuilder, private productService: ProductsService ,
    private productCategoriesService: ProductcategoriesService, private router: Router) { 
      
      // for(var product of Object.values(this.products)) {
      //   this.productNames.push(product.ProductName);
      //   this.productBrands.push(product.ProductBrand);
      // }
      
      // console.log(this.productNames);
      // console.log(this.productBrands);
    }

  ngOnInit(): void {
    
    this.productBrands = [];
    this.productNames = [];
      
    this.addProductForm = this.formBuilder.group({
      ProductName : ['', Validators.required],
      ProductBrand: ['', Validators.required],
      ProductQtyAvailable: ['', Validators.required],
      ProductPrice: ['',Validators.required],
      ProductCategoryId: ['', Validators.required]
    });

    this.productService.viewAllProducts().subscribe(
      (data)=>{ this.products = data; 
        this.products.forEach(element => {
          this.productNames.push(element.productName.toUpperCase())
          this.productBrands.push(element.productBrand.toUpperCase());
        });
        console.log(this.products);
        console.log(this.productBrands)},
      (err)=>{ console.log(err); }
    );
    
    this.productCategoriesService.viewAllProductCategories().subscribe(
      (data)=> {this.productCategories = data, console.log(this.productCategories);},
      (err) => {console.log(err)}
    );
    
  }

  public onSubmit() {
    this.productToAdd = this.addProductForm.value;
    this.addProducts(this.productToAdd);
  }

  public addProducts(product: Product) {
    this.productService.addProduct(product).subscribe(
      (data)=>{ console.log(data); this.router.navigate(['addProductCategories']) },
      (err)=>{ console.log(err) }
    );
  }

  public checkProduct(productBrand) {
    var productNameToCheck = this.addProductForm.controls['ProductName'].value.toUpperCase();
    if(this.productBrands.includes(productBrand.target.value.toUpperCase())
      && this.productNames.includes(productNameToCheck)) {
      alert("Product Already Exists!");
    }
  }
}
