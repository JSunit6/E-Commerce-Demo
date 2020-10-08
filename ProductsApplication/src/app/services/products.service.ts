import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  token = localStorage.getItem("token");
  baseUrl = "https://localhost:44344/api/"

  constructor() { }

  
}
