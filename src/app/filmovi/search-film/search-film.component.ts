import { Component, ElementRef, ViewChild } from '@angular/core';
import { Film, Reziser, SearchFilm, Zanr } from '../../model/app.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmService } from '../film.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-film',
  standalone: false,
  templateUrl: './search-film.component.html',
  styleUrl: './search-film.component.scss'
})
export class SearchFilmComponent {
 searchForm!: FormGroup;
  results$!: Observable<Film[]>;
  zanrovi: Zanr[] = [];
  reziseri: Reziser[] = [];
  dataSource = new MatTableDataSource<Film>([]);
  displayedColumns = ['naziv', 'zanr', 'reziser'];

  @ViewChild('resultsCard', { static: false }) resultsCard!: ElementRef<HTMLElement>;

  constructor(
    private fb: FormBuilder,
    private filmService: FilmService
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      naziv: [''],
      reziserId: [null],
      zanrId: [null]
    });

    this.filmService.getZanrovi().subscribe(z => this.zanrovi = z);
    this.filmService.getReziseri().subscribe(r => this.reziseri = r);
  }

  search() {
      const criteria: SearchFilm = this.searchForm.value;
  this.filmService.searchFilms(criteria)
    .subscribe(films => {
      this.dataSource.data = films;
     
      setTimeout(() => {
        this.resultsCard.nativeElement
          .scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
}
