import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateFilmComponent } from './filmovi/create-film/create-film.component';
import { SearchFilmComponent } from './shared/search-film/search-film.component';
import { CreateRecenzijaComponent } from './recenzije/create-recenzija/create-recenzija.component';
import { ListRecenzijaComponent } from './recenzije/list-recenzija/list-recenzija.component';

const routes: Routes = [
  {path:'',component: LoginComponent},
   {path:'login',component: LoginComponent},
  {path:'home',component: HomeComponent},
  { path: 'filmovi',    loadChildren: () => import('./filmovi/filmovi.module').then(m => m.FilmoviModule) },
  { path: 'recenzije',  loadChildren: () => import('./recenzije/recenzije.module').then(m => m.RecenzijeModule) },
  { path: 'liste',      loadChildren: () => import('./liste/liste.module').then(m => m.ListeModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
