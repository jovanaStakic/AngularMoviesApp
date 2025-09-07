import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateListaComponent } from './create-lista/create-lista.component';
import { SearchListaComponent } from './search-lista/search-lista.component';
import { ListListaComponent } from './list-lista/list-lista.component';
import { EditListaComponent } from './edit-lista/edit-lista.component';
import { AuthGuard } from '../auth/auth-guard';

const routes: Routes = [
  { path: 'create', component: CreateListaComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchListaComponent, canActivate: [AuthGuard]},
  { path: 'list', component: ListListaComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditListaComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeRoutingModule {}
