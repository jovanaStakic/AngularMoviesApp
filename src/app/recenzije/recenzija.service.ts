import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { CreateRecenzija, Recenzija } from '../model/app.model';

@Injectable({
  providedIn: 'root',
})
export class RecenzijaService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public saveRecenzija(
    recenzija: CreateRecenzija
  ): Observable<CreateRecenzija> {
    const url = `${this.apiUrl}/recenzije`;
    return this.httpClient.post<CreateRecenzija>(url, recenzija);
  }

  public getRecenzije(): Observable<Recenzija[]> {
    const url = `${this.apiUrl}/recenzije`;
    return this.httpClient.get<Recenzija[]>(url);
  }

  deleteRecenzija(id: number): Observable<void> {
    const url = `${this.apiUrl}/recenzije/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
