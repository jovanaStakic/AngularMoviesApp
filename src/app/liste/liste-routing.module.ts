import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateListaComponent } from './create-lista/create-lista.component';
import { SearchListaComponent } from './search-lista/search-lista.component';
import { ListListaComponent } from './list-lista/list-lista.component';
import { EditListaComponent } from './edit-lista/edit-lista.component';

const routes: Routes = [
  { path: 'create', component: CreateListaComponent },
  { path: 'search', component: SearchListaComponent },
  { path: 'list', component: ListListaComponent },
  { path: 'edit', component: EditListaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeRoutingModule {}
