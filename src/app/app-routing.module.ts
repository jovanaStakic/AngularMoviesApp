import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'filmovi',
    loadChildren: () =>
      import('./filmovi/filmovi.module').then((m) => m.FilmoviModule),
  },
  {
    path: 'recenzije',
    loadChildren: () =>
      import('./recenzije/recenzije.module').then((m) => m.RecenzijeModule),
  },
  {
    path: 'liste',
    loadChildren: () =>
      import('./liste/liste.module').then((m) => m.ListeModule),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
