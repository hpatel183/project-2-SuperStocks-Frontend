import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../../model/User';
import { UserService } from '../services/user.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, public dialog: MatDialog) { }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        user: user
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != '') {
        console.log("Updating user...", result);
        let updateUser: User = {
          id: result[0],
          username: result[1],
          password: result[2],
          email: result[3],
          firstName: result[4],
          lastName: result[5],
          role: null
        }
        this.userService.updateUserInfo(updateUser.id, updateUser.username, updateUser.password, updateUser.email, updateUser.firstName, updateUser.lastName)
          .subscribe((response) => {
            console.log("Updated user:", response);
            this.getAllUsers();
          });
      }
      console.log("Dialog result", typeof result);
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

}