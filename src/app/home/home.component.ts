import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  p = 1;

  articles: any;

  constructor(private afs: AngularFirestore, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.afs.collection('articles')
      .snapshotChanges()
      .pipe(map(changes => {
        return changes
          .map((doc: any) => {
          return {
            id: doc.payload.doc.id,
            data: doc.payload.doc.data()
          };
        }).sort((a1, a2) => a2.data.createdAt.toString().localeCompare(a1.data.createdAt.toString()));
      }))
      .subscribe(articles => {
        this.spinner.hide();
        this.articles = articles;
      });
  }
}
