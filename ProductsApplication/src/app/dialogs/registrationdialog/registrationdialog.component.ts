import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registrationdialog',
  templateUrl: './registrationdialog.component.html',
  styleUrls: ['./registrationdialog.component.css']
})
export class RegistrationdialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
  }

}
