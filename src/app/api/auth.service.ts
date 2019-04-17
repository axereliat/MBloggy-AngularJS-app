import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class AuthService {

  constructor(private router: Router, private afAuth: AngularFireAuth,
              private toastr: ToastrService, private spinner: NgxSpinnerService, private afs: AngularFirestore) {}

  isAdmin() {
    return this.isLoggedIn() && this.afAuth.auth.currentUser.uid === 'DYUxB3FPELdSKF1DsnQ2O3Tj5CA2';
  }

  isLoggedIn() {
    return this.afAuth.auth.currentUser !== null;
  }

  get currentUser() {
    return this.afAuth.auth.currentUser;
  }

  signIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  addToUsersCollection(uid: string, email: string) {
    this.afs.collection('users').add({
      uid,
      email
    })
      .then(() => {
        this.spinner.hide();
        this.router.navigateByUrl('/signin');
        this.toastr.success('You are successfully registered :)');
      })
      .catch(err => {
        this.spinner.hide();
        this.toastr.error(err.message);
      });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(res => {
        this.router.navigateByUrl('/signin');
        this.toastr.success('You are successfully logged out');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
