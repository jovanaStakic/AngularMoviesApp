import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecenzijaComponent } from './create-recenzija/create-recenzija.component';
import { ListRecenzijaComponent } from './list-recenzija/list-recenzija.component';
import { EditListaComponent } from '../liste/edit-lista/edit-lista.component';

const routes: Routes = [
  { path: 'create', component: CreateRecenzijaComponent },
  { path: 'list',   component: ListRecenzijaComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecenzijeRoutingModule { }
