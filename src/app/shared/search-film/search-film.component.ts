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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';

type Mode = 'none' | 'single' | 'multi';

@Component({
  selector: 'app-search-film',
  standalone: false,
  templateUrl: './search-film.component.html',
  styleUrl: './search-film.component.scss',
})
export class SearchFilmComponent {
  mode:Mode="none";
  searchForm!: FormGroup;
  results$!: Observable<Film[]>;
  zanrovi: Zanr[] = [];
  reziseri: Reziser[] = [];
  dataSource = new MatTableDataSource<Film>([]);
  selection = new SelectionModel<Film>;
  displayedColumns = ['naziv', 'zanr', 'reziser'];
  selectableFilm = false;

  @ViewChild('resultsCard') resultsCard!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private filmService: FilmService,
    private snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<SearchFilmComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.selectableFilm = this.dialogRef != null;
    if (this.dialogRef) {
      this.mode = this.data?.mode ?? 'single'; 
        this.selection = new SelectionModel<Film>(true, []);
      }
    
  
    this.searchForm = this.fb.group({
      naziv: [''],
      reziserId: [null],
      zanrId: [null],
    });

    this.filmService.getZanrovi().subscribe((z) => (this.zanrovi = z));
    this.filmService.getReziseri().subscribe((r) => (this.reziseri = r));
  }

  get cols(): string[] {
  return this.mode != 'none'
    ? ['select', ...this.displayedColumns]
    : this.displayedColumns;
}

  search() {
    const criteria: SearchFilm = this.searchForm.value;
    this.filmService.searchFilms(criteria).subscribe({
      next: (films) => {
        this.snackBar.open('Pronađeni su filmovi.', 'OK', {
          duration: 3000,
          panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.selection.clear(); 
        this.dataSource.data = films;
        setTimeout(() => {
          this.resultsCard.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        });
      },
      error: () => {
        this.snackBar.open('Nema filmova za zadati kriterijum pretrage.', 'Zatvori', {
          duration: 3000,
          panelClass: ['snack-error'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

confirmSelection() {
  if (!this.selectableFilm) return;
  this.dialogRef!.close(this.selection.selected);
}


  selectRow(film: Film) {
    if (this.mode === 'multi') {
      this.selection!.toggle(film);
    }else{
      this.dialogRef!.close(film);
}
  }

  close() {
    if (this.selectableFilm) {
      this.dialogRef!.close();
    }
  }
}
