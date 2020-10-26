import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ProductcategoriesService } from '../../services/productcategories.service';
import { Productcategories } from '../../models/productcategories';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproductcategories',
  templateUrl: './addproductcategories.component.html',
  styleUrls: ['./addproductcategories.component.css']
})
export class AddproductcategoriesComponent implements OnInit {

  addProductCategoryForm: FormGroup;
  productCategoryToAdd: Productcategories;

  constructor(private formBuilder: FormBuilder, private productCategoryService: ProductcategoriesService, private router: Router) { }

  ngOnInit(): void {
    
    this.addProductCategoryForm = this.formBuilder.group ({
      ProductCategoryName:['', Validators.required]
    }
    );
  }

  public addProductCategory(productCategory: Productcategories) {
    this.productCategoryService.addProducCategory(productCategory).subscribe(
      ()=>{
        this.router.navigate(['addProducts']);
      },
      (error) => {console.log(error)}
    );
  }

  public onSubmit() {
    this.productCategoryToAdd = this.addProductCategoryForm.value;
    this.addProductCategory(this.productCategoryToAdd);
  }

}
