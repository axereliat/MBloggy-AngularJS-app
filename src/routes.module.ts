import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './app/home/home.component';
import {SignupComponent} from './app/signup/signup.component';
import {SigninComponent} from './app/signin/signin.component';
import {ArticlesCreateComponent} from './app/articles/articles-create/articles-create.component';
import {ArticlesDetailsComponent} from './app/articles/articles-details/articles-details.component';
import {AuthGuardService} from './app/guards/auth.guard';
import {UsersListComponent} from './app/admin/users-list/users-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {
    path: 'articles', children: [
      {path: 'create', canActivate: [AuthGuardService], component: ArticlesCreateComponent},
      {path: 'details/:id', component: ArticlesDetailsComponent}
    ]
  },
  {
    path: 'admin', children: [
      {path: 'users', component: UsersListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutesModule {
}
