import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false;
  isUser: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((response) => {
      if (!response["message"]) {
        console.log(response);
        if (response["userRole"].roleName == 'Admin') {
          this.isAdmin = true;
          this.isUser = false;
        }
      }
    });
  }

}
