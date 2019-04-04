import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../api/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ArticleService} from '../../api/article.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  @Input() articleId: string;

  @Input() comments: any;

  constructor(public authService: AuthService, private spinner: NgxSpinnerService,
              private articleService: ArticleService, private toastr: ToastrService) { }

  ngOnInit() {
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
}
