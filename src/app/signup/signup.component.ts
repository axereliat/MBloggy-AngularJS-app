import {Component, OnInit} from '@angular/core';
import {RegisterModel} from '../models/register.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errMsg: string;

  model: RegisterModel;

  constructor(private afAuth: AngularFireAuth, private router: Router, private spinner: NgxSpinnerService) {
    this.model = new RegisterModel('', '', '');
    this.errMsg = '';
  }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show();
    this.afAuth.auth.createUserWithEmailAndPassword(this.model.email, this.model.password)
      .then(res => {
        this.spinner.hide();
        this.router.navigateByUrl('/signin');
      })
      .catch(err => {
        this.spinner.hide();
        this.errMsg = err.message;
      });
  }
}
