import {Component, OnInit} from '@angular/core';
import {LoginModel} from '../models/login.model';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../api/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  model: LoginModel;

  constructor(private router: Router, private afAuth: AngularFireAuth,
              private authService: AuthService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
    this.model = new LoginModel('', '');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show();
    this.afAuth.auth.signInWithEmailAndPassword(this.model.email, this.model.password)
      .then(res => {
        this.spinner.hide();
        this.router.navigateByUrl('/');
        this.toastr.success('You are successfully logged in :)');
      })
      .catch(err => {
        this.spinner.hide();
        this.toastr.error(err.message);
      });
  }
}
