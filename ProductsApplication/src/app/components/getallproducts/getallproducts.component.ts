import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-getallproducts',
  templateUrl: './getallproducts.component.html',
  styleUrls: ['./getallproducts.component.css']
})
export class GetallproductsComponent implements OnInit {

  products: Product[];

  constructor(private _productService: ProductsService) { }


  public getProducts() {
    
  }

  ngOnInit(): void {
    console.log("HERE")
    this._productService.viewAllProducts().subscribe(
      (data)=>{this.products = data; console.log(this.products)},
      (err) => {console.log(err)}
    );
  }

}
