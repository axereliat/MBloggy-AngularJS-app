import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutesModule} from '../routes.module';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {UsersModule} from './users.module';
import {environment} from '../environments/environment';
import {ArticlesModule} from './articles.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuardService} from './guards/auth.guard';
import {NgxPaginationModule} from 'ngx-pagination';
import {TimeAgoPipe} from 'time-ago-pipe';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    TagInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UsersModule,
    ArticlesModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
