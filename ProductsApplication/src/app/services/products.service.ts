import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly token = localStorage.getItem('token');
  baseUrl = "https://localhost:44344/api/"

  constructor(private httpClient: HttpClient) { }

  addProduct(productToAdd: Product): Observable<Product> {
    const httpOptions = {headers: new HttpHeaders({'Authorization': 'Bearer'+this.token, 'Content-Type':'application/json'})};
    return this.httpClient.post<Product>(this.baseUrl+"addProducts",JSON.stringify(productToAdd), httpOptions);
  }
  
}
