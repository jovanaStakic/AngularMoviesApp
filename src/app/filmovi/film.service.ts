import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateFilm,
  Film,
  Glumac,
  Reziser,
  SearchFilm,
  Zanr,
} from '../model/app.model';
@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public getReziseri(): Observable<Reziser[]> {
    const url = `${this.apiUrl}/reziseri`;
    return this.httpClient.get<Reziser[]>(url);
  }

  public getGlumci(): Observable<Glumac[]> {
    const url = `${this.apiUrl}/glumci`;
    return this.httpClient.get<Glumac[]>(url);
  }

  public getZanrovi(): Observable<Zanr[]> {
    const url = `${this.apiUrl}/zanrovi`;
    return this.httpClient.get<Zanr[]>(url);
  }

  public saveFilm(film: CreateFilm): Observable<CreateFilm> {
    const url = `${this.apiUrl}/filmovi`;
    return this.httpClient.post<CreateFilm>(url, film);
  }

  searchFilms(criteria: SearchFilm): Observable<Film[]> {
    const url = `${this.apiUrl}/filmovi/search`;
    let params = new HttpParams();
    if (criteria.naziv) params = params.set('naziv', criteria.naziv);
    if (criteria.reziserId)
      params = params.set('reziserId', criteria.reziserId.toString());
    if (criteria.zanrId)
      params = params.set('zanrId', criteria.zanrId.toString());
    return this.httpClient.get<Film[]>(url, { params });
  }
}
