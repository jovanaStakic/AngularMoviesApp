import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { CreateRecenzija } from '../model/app.model';

@Injectable({
  providedIn: 'root'
})
export class RecenzijaService {

 private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

 public saveRecenzija(recenzija: CreateRecenzija): Observable<CreateRecenzija> {
     const url = `${this.apiUrl}/recenzije`;
     return this.httpClient.post<CreateRecenzija>(url, recenzija);
   }
}
