import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireStorageModule } from '@angular/fire/storage';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AppRoutesModule} from '../routes.module';
import { ArticlesCreateComponent } from './articles/articles-create/articles-create.component';
import { ArticlesDetailsComponent } from './articles/articles-details/articles-details.component';
import {TagInputModule} from 'ngx-chips';

@NgModule({
  declarations: [
  ArticlesCreateComponent,
  ArticlesDetailsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutesModule,
    FormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    TagInputModule
  ],
  providers: [],
  bootstrap: []
})
export class ArticlesModule { }
