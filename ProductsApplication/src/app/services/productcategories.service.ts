import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productcategories } from '../models/productcategories';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoriesService {
  readonly token = localStorage.getItem('token');
  baseUrl = "/api/productcategories"
  
  constructor(private httpClient: HttpClient) { }

  viewAllProductCategories(): Observable<Productcategories[]> {
    const httpOptions = {headers: new HttpHeaders({'Authorization': 'Bearer'+this.token})};
    return this.httpClient.get<Productcategories[]>(this.baseUrl, httpOptions);
  }

  viewProductCategory(id: number): Observable<Productcategories> {
    const httpOptions = {headers: new HttpHeaders({'Authorization': 'Bearer'+this.token})};
    return this.httpClient.get<Productcategories>(this.baseUrl+"/"+id, httpOptions);
  }

  addProducCategory(productCategory: Productcategories): Observable<Productcategories> {
    const httpOptions = {headers: new HttpHeaders({'Authorization': 'Bearer'+this.token, 'Content-Type':'application/json'})};
    return this.httpClient.post<Productcategories>(this.baseUrl, productCategory, httpOptions);
  }

}
