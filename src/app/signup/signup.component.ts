import {Component, OnInit} from '@angular/core';
import {RegisterModel} from '../models/register.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../api/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model: RegisterModel;

  constructor(private authService: AuthService, private router: Router,
              private spinner: NgxSpinnerService, private toastr: ToastrService, private afs: AngularFirestore) {
    this.model = new RegisterModel('', '', '');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show();
    this.authService.signUp(this.model.email, this.model.password)
      .then(res => {
        console.log(res);
        this.authService.addToUsersCollection(res.user.uid, this.model.email)
      })
      .catch(err => {
        this.spinner.hide();
        this.toastr.error(err.message);
      });
  }
}
