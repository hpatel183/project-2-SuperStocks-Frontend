import { Component, OnInit } from '@angular/core';

import { User } from '../../model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((response) => {
      console.log("Userlist", response);
      this.users = response;
    });
  }

}
