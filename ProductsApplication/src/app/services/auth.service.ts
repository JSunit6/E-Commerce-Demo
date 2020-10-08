import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "https://localhost:44344/api/authenticate/";
  
  constructor(private _httpClient: HttpClient, private _jwtHelperService: JwtHelperService) {

  }

  public async register(registerFormData){
    return this._httpClient.post(this.baseUrl+"register", JSON.stringify(registerFormData));
  }
  
  public async login(loginFormData) {
    return this._httpClient.post(this.baseUrl+"login",JSON.stringify(loginFormData));
  }

  public async isAuthenticated() {
    
    if(!this._jwtHelperService.isTokenExpired(this._jwtHelperService.tokenGetter())) {
      return true;
    }
    return false;
  }

}
