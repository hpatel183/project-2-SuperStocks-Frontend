import { Component, OnInit } from '@angular/core';

import { User } from 'src/model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usernameInput: string;
  passwordInput: string;
  emailInput: string;
  firstNameInput: string;
  lastNameInput: string;
  userId: number;

  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getCurrentUser().subscribe((response) => {
      this.userId = response.id;
      this.usernameInput = response.username;
      this.passwordInput = response.password;
      this.emailInput = response.email;
      this.firstNameInput = response.firstName;
      this.lastNameInput = response.lastName;
    });
  }

  updateUser() {
    this.userService.updateUserInfo(this.userId, this.usernameInput, this.passwordInput, this.emailInput, this.firstNameInput, this.lastNameInput)
      .subscribe((response) => {
        console.log("Response", response);
        this.getUserInfo();
      });
  };

}
