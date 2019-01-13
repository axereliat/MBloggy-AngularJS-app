import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-articles-details',
  templateUrl: './articles-details.component.html',
  styleUrls: ['./articles-details.component.css']
})
export class ArticlesDetailsComponent implements OnInit {

  article: any;

  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService, private afs: AngularFirestore) { }

  ngOnInit() {
    const articleId = this.route.snapshot.params['id'];

    this.spinner.show();
    this.afs.collection('articles')
      .doc(articleId)
      .valueChanges()
      .subscribe(article => {
        this.spinner.hide();
        this.article = article;
      });
  }
}
