import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  userService: UserService;
  router: Router;

  logoutMessage: string = "Logging out...";

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  ngOnInit(): void {
    this.userService.logoutUser().subscribe((response) => {
      this.logoutMessage = response.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
    });
  }

}
