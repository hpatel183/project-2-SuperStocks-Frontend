import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/User';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  usernameInput: string;
  passwordInput: string;
  emailInput: string;
  firstNameInput: string;
  lastNameInput: string;
  roleInput: string;

  userService: UserService;
  router: Router;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  registerUser() {
    this.userService.registerUser(this.usernameInput, this.passwordInput, this.emailInput, this.firstNameInput, this.lastNameInput, this.roleInput)
      .subscribe((response) => {
        console.log("Retrieved response: ", response);
      if (response.message == "Successfully registered user") {
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
