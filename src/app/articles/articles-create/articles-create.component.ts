import { Component, OnInit } from '@angular/core';
import {ArticleModel} from '../../models/article.model';
import {ArticleService} from '../../api/article.service';

@Component({
  selector: 'app-toys-create',
  templateUrl: './articles-create.component.html',
  styleUrls: ['./articles-create.component.css']
})
export class ArticlesCreateComponent implements OnInit {

  model: ArticleModel;

  constructor(private articleService: ArticleService) {
    this.model = new ArticleModel('', '', [], '');
  }

  ngOnInit() {

  }

  submit() {
    this.articleService.create(this.model);
  }
}
