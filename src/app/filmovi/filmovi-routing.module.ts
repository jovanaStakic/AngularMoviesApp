import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFilmComponent } from './create-film/create-film.component';
import { SearchFilmComponent } from '../shared/search-film/search-film.component';

const routes: Routes = [
  { path: 'create',  component: CreateFilmComponent },
  { path: 'search', component: SearchFilmComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmoviRoutingModule { }
