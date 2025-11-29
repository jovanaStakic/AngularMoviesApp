import { Component, OnInit } from '@angular/core';
import { FilmService } from '../filmovi/film.service';
import { ListaService } from '../liste/lista.service';
import { RecenzijaService } from '../recenzije/recenzija.service';
import { SearchFilm, StoredKorisnik} from '../model/app.model';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  fullName!:string;
  moviesNumber: Number=0;
  reviewNumber: Number=0;
  listsNumber: Number=0;

  constructor(
    private filmService: FilmService,
    private listaService: ListaService,
    private recenzijaService: RecenzijaService
  ) {}
  ngOnInit(): void {
    this.loadNameFromStorage();
    const criteria: SearchFilm = {
      naziv: undefined,
      reziserId: undefined,
      zanrId: undefined,
    };

    this.filmService.searchFilms(criteria).subscribe((filmovi) => {
      this.moviesNumber = filmovi.length;
    });
    this.listaService.getAllListe().subscribe((liste) => {
      this.listsNumber = liste.length;
    });
    this.recenzijaService.getAllRecenzije().subscribe((recenzije) => {
      this.reviewNumber = recenzije.length;
    });
  }

  private loadNameFromStorage() {
    const raw = localStorage.getItem('user');
    if (!raw) { 
      this.fullName = 'Korisnik'; 
      return; 
    }

    try {
      const u = JSON.parse(raw) as StoredKorisnik;
      const ime = (u.ime ?? '').trim();
      const prezime = (u.prezime ?? '').trim();
      console.log(raw);
      this.fullName = (ime && prezime) ? `${ime} ${prezime}`.trim() : (u.korisnickoIme || 'Korisnik');
    } catch {
      this.fullName = 'Korisnik';
    }
  }
}

