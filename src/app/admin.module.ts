import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './admin/users-list/users-list.component';
import {UserService} from './api/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [UserService],
  declarations: [UsersListComponent]
})
export class AdminModule { }
