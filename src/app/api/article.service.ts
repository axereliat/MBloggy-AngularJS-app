import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {ArticleModel} from '../models/article.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ArticleService {

  constructor(private spinner: NgxSpinnerService, private afs: AngularFirestore,
              private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  create(model: ArticleModel) {
    this.spinner.show();
    this.afs.collection('articles').add({
      title: model.title,
      content: model.content,
      category: model.category,
      tags: model.tags.map(item => item.value),
      author: {
        uid: this.authService.currentUser.uid,
        email: this.authService.currentUser.email
      },
      createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      comments: []
    })
      .then(() => {
        this.spinner.hide();
        this.router.navigateByUrl('/');
        this.toastr.success('Your article was successfully created :)');
      })
      .catch(err => {
        this.spinner.hide();
        this.toastr.error(err.message);
        console.log(err);
      });
  }
}
