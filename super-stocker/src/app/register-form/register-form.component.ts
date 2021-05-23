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

}
