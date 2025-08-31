import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { CreateLista, Lista, UpdateLista } from '../model/app.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private apiUrl=environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  public saveLista(lista:CreateLista):Observable<CreateLista>{
    const url=this.apiUrl+'/liste';
    return this.httpClient.post<CreateLista>(url,lista);
  }

   searchListe(naziv: string): Observable<Lista[]> {
    const url = `${this.apiUrl}/liste/search`;
    const params = new HttpParams().set('naziv', naziv);
    return this.httpClient.get<Lista[]>(url, { params });
  }

    public getAllListe(): Observable<Lista[]> {
    const url = `${this.apiUrl}/liste`;
    return this.httpClient.get<Lista[]>(url);
  }

  public deleteLista(id: number): Observable<void> {
    const url = `${this.apiUrl}/liste/${id}`;
    return this.httpClient.delete<void>(url);
  }

  updateLista(id: number, lista: UpdateLista) {
  return this.httpClient.put<Lista>(`${this.apiUrl}/liste/update/${id}`, lista);
}
}
