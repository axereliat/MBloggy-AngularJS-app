import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ArticleModel} from '../../models/article.model';
import {AuthService} from '../../api/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-toys-create',
  templateUrl: './articles-create.component.html',
  styleUrls: ['./articles-create.component.css']
})
export class ArticlesCreateComponent implements OnInit {

  model: ArticleModel;

  constructor(private afs: AngularFirestore, private authService: AuthService,
              private spinner: NgxSpinnerService, private router: Router, private toastr: ToastrService) {
    this.model = new ArticleModel('', '', [], '');
  }

  ngOnInit() {

  }

  submit() {
    this.spinner.show();
    this.afs.collection('articles').add({
      title: this.model.title,
      content: this.model.content,
      category: this.model.category,
      tags: this.model.tags.map(item => item.value),
      author: {
        uid: this.authService.currentUser.uid,
        email: this.authService.currentUser.email
      },
      createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      comments: []
    })
      .then(res => {
        this.spinner.hide();
        this.router.navigateByUrl('/');
        this.toastr.success('Your article was successfully created :)');
      })
      .catch(err => {
        this.spinner.hide();
        console.log(err);
      });
  }
}
