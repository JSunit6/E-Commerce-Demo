import { Injectable } from '@angular/core';
import { tokenGetter } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productcategories } from '../models/productcategories';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoriesService {
  readonly token = tokenGetter();
  baseUrl = "https://localhost:44344/api/"
  
  constructor(private httpClient: HttpClient) { }

  getProductCategories(): Observable<Productcategories[]> {
    return this.httpClient.get<Productcategories[]>(this.baseUrl+"getProductCategories");
  }

}
