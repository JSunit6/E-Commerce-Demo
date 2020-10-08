import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Appuser } from '../../models/appuser';
import { AuthService } from '../../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegistrationdialogComponent } from '../../dialogs/registrationdialog/registrationdialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  public registrationInvalid: boolean;
  public registrationError = false;
  private returnUrl: string;
  registeredUser: Appuser
  digitRegexp: any;
  nonAlphaNumericRegexp: any;
  public invalidPassword = false;

  constructor(private resultDialog: MatDialog, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.registeredUser = new Appuser();
    this.digitRegexp = new RegExp('.*[0-9].*');
    this.nonAlphaNumericRegexp = new RegExp('.*[@#$%^&+=].*');
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      FullName: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', Validators.email],
      Password: ['', Validators.required]
    });
  }

  public async signUp(userToRegister){
     this.authService.register(userToRegister).subscribe(
      (repsonse: HttpResponse<any>) => { 
        if(repsonse.status == 201){
          this.registrationInvalid = false;
        }
        else{
          this.registrationInvalid = true;
        }
        this.registrationError = false;
        this.openResultDialog(); 
      },
      err => { 
        this.registrationError = true;
        this.openResultDialog();
        console.log(err); }
    );
  }

  public onSubmit(){
    if(this.registerForm.valid && !this.invalidPassword){
      if(this.registeredUser != null){
        this.registeredUser = this.registerForm.value;
        this.signUp(this.registeredUser);
      }
    }
    else{
      console.log("Invalid");
    }
  }

  public openResultDialog() {
    const resultDialogRef = this.resultDialog.open(RegistrationdialogComponent, {
      data: { registrationStatus: this.registrationInvalid, registrationError: this.registrationError },
    });

    resultDialogRef.afterClosed().subscribe(
      result => {
        console.log(`Dialog Res: ${result}`)
      }
    )
  }

  public checkPassword(passwordInputFieldObj) {
    console.log("Called");
    const password = passwordInputFieldObj.target.value;
    if(password.length < 6 || !(this.digitRegexp.test(password) || !(this.nonAlphaNumericRegexp.test(password)))){
      this.invalidPassword = true;
    }
    else {
      this.invalidPassword = false;
    }
  }
}
