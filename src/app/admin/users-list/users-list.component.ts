import { Component, OnInit } from '@angular/core';
import {UserService} from '../../api/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: any[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.fetchUsers()
      .subscribe(users => {
        this.users = users;
      });
  }
}
