import {Component, OnInit} from '@angular/core';
import {LoginModel} from '../models/login.model';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../api/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  errMsg: string;

  model: LoginModel;

  constructor(private router: Router, private afAuth: AngularFireAuth, private authService: AuthService, private spinner: NgxSpinnerService) {
    this.model = new LoginModel('', '');
    this.errMsg = '';
  }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show();
    this.afAuth.auth.signInWithEmailAndPassword(this.model.email, this.model.password)
      .then(res => {
        this.spinner.hide();
        this.router.navigateByUrl('/');
      })
      .catch(err => {
        this.spinner.hide();
        this.errMsg = err.message;
      });
  }

}
