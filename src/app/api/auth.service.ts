import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthService {

  constructor(private router: Router, private afAuth: AngularFireAuth, private toastr: ToastrService) {}

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

  logout() {
    this.afAuth.auth.signOut()
      .then(res => {
        this.router.navigateByUrl('/');
        this.toastr.success('You are successfully logged out');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
