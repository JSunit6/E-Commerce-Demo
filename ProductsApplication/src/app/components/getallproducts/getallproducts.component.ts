import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

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
  }

}
