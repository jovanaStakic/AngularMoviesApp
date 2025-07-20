import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { LoginKorisnik, RegisterKorisnik, SuccessLogin } from '../model/app.model';
import { environment } from '../enviroments/enviroment';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private apiUrl = environment.apiUrl + '/auth';
  loggedIn$=new BehaviorSubject<boolean>(this.loggedIn());

  constructor(private httpClient:HttpClient) { }

  private loggedIn(): boolean {
    return localStorage.getItem("jwt")!==null;
  }

  public getToken():string | null{
    return localStorage.getItem("jwt");
  }

  public login(loginKorisnik:LoginKorisnik):Observable<SuccessLogin>{
    const url = `${this.apiUrl}/login`;
    return this.httpClient.post<SuccessLogin>(url,loginKorisnik).pipe( 
      tap(response=>{
        localStorage.setItem('jwt', response.token);
          localStorage.setItem('user', JSON.stringify({
            korisnickoIme: response.korisnickoIme,
            ime: response.ime,
            prezime: response.prezime
          }));
        this.loggedIn$.next(true);
      }));
  }
  public register(registerKorisnik:RegisterKorisnik):Observable<RegisterKorisnik>{
    const url= `${this.apiUrl}/register`;
    return this.httpClient.post<RegisterKorisnik>(url, registerKorisnik);
  }

  public logOut(){
    localStorage.removeItem("jwt");
    this.loggedIn$.next(false);
  }
}
