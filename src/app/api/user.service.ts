import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private spinner: NgxSpinnerService, private afs: AngularFirestore,
              private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  fetchUsers(): Observable<any> {
    return this.afs.collection('users')
      .snapshotChanges()
      .pipe(map(changes => {
        return changes
          .map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              data: doc.payload.doc.data()
            };
          });
      }));
  }
}
