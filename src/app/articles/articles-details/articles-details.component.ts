import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFirestore} from '@angular/fire/firestore';
import {Article} from '../../data/Article';
import {AuthService} from '../../api/auth.service';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import uuidv1 from 'uuid/v1';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-articles-details',
  templateUrl: './articles-details.component.html',
  styleUrls: ['./articles-details.component.css']
})
export class ArticlesDetailsComponent implements OnInit {

  article: Article;

  comment: string;

  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private afs: AngularFirestore, public authService: AuthService, private toastr: ToastrService) {
    this.article = new class implements Article {
      author: any;
      category: string;
      content: string;
      createdAt: string;
      tags: string[];
      title: string;
      comments: any[];
    };
    this.comment = '';
  }

  ngOnInit() {
    const articleId = this.route.snapshot.params['id'];

    this.spinner.show();
    this.afs.collection('articles')
      .doc(articleId)
      .valueChanges()
      .subscribe(article => {
        this.spinner.hide();
        this.article = article as Article;
      });
  }

  postComment() {
    const articleId = this.route.snapshot.params['id'];

    this.spinner.show();
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
              content: this.comment,
              createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            })
          }).then(() => {
            this.spinner.hide();
            this.comment = '';
            this.toastr.success('Your comment was successfully posted :)');
          }).catch(err => {
            this.spinner.hide();
            this.comment = '';
            console.log(err);
        });
      });
  }

  deleteComment(commentId) {
    const articleId = this.route.snapshot.params['id'];

    this.spinner.show();
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
          this.spinner.hide();
          this.toastr.success('Your comment was successfully deleted');
        }).catch(err => {
          this.spinner.hide();
          console.log(err);
        });
      });
  }
}
