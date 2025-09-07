import {
  Component,
  ElementRef,
  Inject,
  Optional,
  ViewChild,
} from '@angular/core';
import { Film, Reziser, SearchFilm, Zanr } from '../../model/app.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmService } from '../../filmovi/film.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-film',
  standalone: false,
  templateUrl: './search-film.component.html',
  styleUrl: './search-film.component.scss',
})
export class SearchFilmComponent {
  searchForm!: FormGroup;
  results$!: Observable<Film[]>;
  zanrovi: Zanr[] = [];
  reziseri: Reziser[] = [];
  dataSource = new MatTableDataSource<Film>([]);
  displayedColumns = ['naziv', 'zanr', 'reziser'];
  selectableFilm = false;

  @ViewChild('resultsCard', { static: false })
  resultsCard!: ElementRef<HTMLElement>;

  constructor(
    private fb: FormBuilder,
    private filmService: FilmService,
    @Optional() private dialogRef: MatDialogRef<SearchFilmComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.selectableFilm = !!this.dialogRef;
    this.searchForm = this.fb.group({
      naziv: [''],
      reziserId: [null],
      zanrId: [null],
    });

    this.filmService.getZanrovi().subscribe((z) => (this.zanrovi = z));
    this.filmService.getReziseri().subscribe((r) => (this.reziseri = r));
  }

  search() {
    const criteria: SearchFilm = this.searchForm.value;
    this.filmService.searchFilms(criteria).subscribe((films) => {
      this.dataSource.data = films;

      setTimeout(() => {
        this.resultsCard.nativeElement
          .scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  select(film: Film) {
    if (!this.selectableFilm) return;
    this.dialogRef!.close(film);
  }

  close() {
    if (this.selectableFilm) {
      this.dialogRef!.close();
    }
  }
}
