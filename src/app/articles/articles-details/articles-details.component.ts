import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Article} from '../../data/Article';
import {AuthService} from '../../api/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ArticleService} from '../../api/article.service';

@Component({
  selector: 'app-articles-details',
  templateUrl: './articles-details.component.html',
  styleUrls: ['./articles-details.component.css']
})
export class ArticlesDetailsComponent implements OnInit {

  articleId: string;

  article: Article;

  comment: string;

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService,
              private spinner: NgxSpinnerService, private authService: AuthService, private toastr: ToastrService) {
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
    this.articleId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.articleService.fetchById(this.articleId, this.article)
      .subscribe(fetchedArticle => {
        this.spinner.hide();
        this.article = fetchedArticle as Article;
      });
  }

  postComment() {
    this.spinner.show();
    this.articleService.postComment(this.articleId, this.comment)
      .then(() => {
        this.spinner.hide();
        this.comment = '';
        this.toastr.success('Your comment was successfully posted :)');
      })
      .catch(err => {
        this.spinner.hide();
        this.comment = '';
        console.log(err);
      });
  }

  deleteComment(commentId) {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }
    this.spinner.show();
    this.articleService.deleteComment(commentId, this.articleId)
      .then(() => {
        this.spinner.hide();
        this.toastr.success('Your comment was successfully deleted');
      })
      .catch(err => {
        this.spinner.hide();
        console.log(err);
      });
  }

  deleteArticle() {
    if (!confirm('Are you sure you want to delete this article?')) {
      return;
    }
    this.spinner.show();
    this.articleService.deleteArticle(this.articleId)
      .then(() => {
        this.spinner.hide();
        this.router.navigateByUrl('/');
        this.toastr.success('Your article was successfully deleted');
      })
      .catch(err => {
        console.log(err);
        this.spinner.hide();
      });
  }
}
