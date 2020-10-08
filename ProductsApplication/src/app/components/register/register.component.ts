import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Appuser } from '../../models/appuser';
import { AuthService } from '../../services/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  public registrationInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  registeredUser: Appuser

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) { 
    this.registeredUser = new Appuser();
  }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      FullName: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', Validators.email],
      Password: ['', Validators.required]
    });
  }

  public async signUp(userToRegister){
    await this._authService.register(userToRegister).then(
     () => { this._router.navigate(['login']);},
     err => { console.log(err); }
    );
  }

  public onSubmit(){
    if(!this.registrationInvalid){
      this.registrationInvalid = false;
      if(this.registeredUser != null){
        this.registeredUser = this.registerForm.value;
        this.signUp(this.registeredUser);
      }
    }
  }

}
