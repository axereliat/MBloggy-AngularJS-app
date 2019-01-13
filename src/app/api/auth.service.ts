import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  isLoggedIn() {
    return this.afAuth.auth.currentUser !== null;
  }

  get currentUser() {
    return this.afAuth.auth.currentUser;
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(res => {
        this.router.navigateByUrl('/');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
