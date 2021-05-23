import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogData } from '../user-list/user-list.component';
import { User } from '../../model/User';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.usernameInput = this.user.username;
    this.passwordInput = this.user.password;
    this.emailInput = this.user.email;
    this.firstNameInput = this.user.firstName;
    this.lastNameInput = this.user.lastName;
  }

  user: User = this.data.user;

  usernameInput: string;
  passwordInput: string;
  emailInput: string;
  firstNameInput: string;
  lastNameInput: string;

}
