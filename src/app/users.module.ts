import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {AppRoutesModule} from '../routes.module';
import {FormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import {CommonModule} from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import {AuthService} from './api/auth.service';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutesModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: []
})
export class UsersModule { }
