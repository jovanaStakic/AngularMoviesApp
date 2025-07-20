import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateFilmComponent } from './filmovi/create-film/create-film.component';
import { SearchFilmComponent } from './filmovi/search-film/search-film.component';

const routes: Routes = [
  {path:'',component: LoginComponent},
  {path:'home',component: HomeComponent},
  {path: 'createFilm', component: CreateFilmComponent},
  {path:'searchFilm',component:SearchFilmComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
