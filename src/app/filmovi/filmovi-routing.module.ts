import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFilmComponent } from './create-film/create-film.component';
import { SearchFilmComponent } from '../shared/search-film/search-film.component';
import { AuthGuard } from '../auth/auth-guard';

const routes: Routes = [
  { path: 'create',  component: CreateFilmComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchFilmComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmoviRoutingModule { }
