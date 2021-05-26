import { Component } from '@angular/core';
import { User } from 'src/model/User';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from '../register-form/register-form.component';

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
  dialog: MatDialog;

  constructor(userService: UserService, router: Router, dialog: MatDialog) {
    this.userService = userService;
    this.router = router;
    this.dialog = dialog;
  }

  // goToRegister() {
  //   this.router.navigate(['/register']);
  // }

  loginUser() {
    this.userService.loginUser(this.usernameInput, this.passwordInput).subscribe((response) => {
      console.log(response.message);
      if (response.message == "Successfully logged in") {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != '') {
        console.log("Registering user...", result);
        let newUser = {
          username: result[0],
          password: result[1],
          email: result[2],
          firstName: result[3],
          lastName: result[4],
          role: result[5]
        }
        this.userService.registerUser(newUser.username, newUser.password, newUser.email, newUser.firstName, newUser.lastName, newUser.role)
          .subscribe((response) => {
            if (response.message == "Successfully registered user") {
              this.router.navigate(['/dashboard']);
            }
          });
      }
    });
  }

}
