import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly token = localStorage.getItem('token');
  baseUrl = "/api/Products";

  constructor(private httpClient: HttpClient) { }

  viewAllProducts(): Observable<Product[]> {
    const httpOptions = {headers: new HttpHeaders({'Authorization': 'Bearer'+this.token})};
    return this.httpClient.get<Product[]>(this.baseUrl, httpOptions);
  }

  viewProduct(id: number): Observable<Product> {
    const httpOptions = {headers: new HttpHeaders({'Authorization': 'Bearer'+this.token})};
    return this.httpClient.get<Product>(this.baseUrl+"/"+id,httpOptions);
  }

  addProduct(productToAdd: Product): Observable<Product> {
    const httpOptions = {headers: new HttpHeaders({'Authorization': 'Bearer'+this.token, 'Content-Type':'application/json'})};
    return this.httpClient.post<Product>(this.baseUrl,JSON.stringify(productToAdd), httpOptions);
  }
  
}
