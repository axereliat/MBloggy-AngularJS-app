import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {ArticleService} from '../api/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search: string;

  p = 1;

  articles: any;

  filteredArticles: any;

  constructor(private articleService: ArticleService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.articleService.fetchAll()
      .subscribe(articles => {
        this.spinner.hide();
        this.articles = articles;
        this.filteredArticles = articles;
      });
  }

  filterArticles() {
    this.filteredArticles = this.articles.filter((article: any) => article.data.title.toLowerCase().includes(this.search.toLowerCase()));
  }
}
