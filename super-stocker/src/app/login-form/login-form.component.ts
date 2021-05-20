import { Component } from '@angular/core';
import { User } from 'src/model/User';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  usernameInput: string;
  passwordInput: string;

  userService: UserService;
  router: Router;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  loginUser() {
    this.userService.loginUser(this.usernameInput, this.passwordInput).subscribe((response) => {
      console.log("Retrieved response: ", response);
      if (response.message == "Successfully logged in") {
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
