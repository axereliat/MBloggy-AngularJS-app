import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {ArticleModel} from '../models/article.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import uuidv1 from 'uuid/v1';
import {Article} from '../data/Article';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class ArticleService {

  constructor(private spinner: NgxSpinnerService, private afs: AngularFirestore,
              private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }

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

  fetchById(articleId: string, article: Article): Observable<any> {
    this.spinner.show();
    return this.afs.collection('articles')
      .doc(articleId)
      .valueChanges();
  }

  postComment(articleId: string, comment: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afs.collection('articles')
        .doc(articleId)
        .get()
        .pipe(map(changes => {
          return changes;
        }))
        .subscribe(article => {
          this.afs.collection('articles')
            .doc(articleId)
            .update({
              comments: article.data().comments.concat({
                id: uuidv1(),
                author: {
                  id: this.authService.currentUser.uid,
                  email: this.authService.currentUser.email
                },
                content: comment,
                createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
              })
            }).then(() => {
            resolve();
          }).catch(err => {
            reject(err);
          });
        });
    });
  }

  deleteArticle(articleId: string) {
    if (!confirm('Are you sure you want to delete this article?')) {
      return;
    }
    this.spinner.show();
    return this.afs.collection('articles')
      .doc(articleId)
      .delete();
  }

  deleteComment(commentId: string, articleId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afs.collection('articles')
        .doc(articleId)
        .get()
        .pipe(map(changes => {
          return changes;
        }))
        .subscribe(article => {
          this.afs.collection('articles')
            .doc(articleId)
            .update({
              comments: article.data().comments.filter(c => c.id !== commentId)
            }).then(() => {
            resolve();
          }).catch(err => {
            reject(err);
          });
        });
    });
  }
}
