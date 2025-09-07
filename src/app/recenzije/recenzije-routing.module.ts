import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecenzijaComponent } from './create-recenzija/create-recenzija.component';
import { ListRecenzijaComponent } from './list-recenzija/list-recenzija.component';
import { AuthGuard } from '../auth/auth-guard';

const routes: Routes = [
  { path: 'create', component: CreateRecenzijaComponent, canActivate: [AuthGuard] },
  { path: 'list',   component: ListRecenzijaComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecenzijeRoutingModule { }
