import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Film, Recenzija } from '../../model/app.model';
import { MatTableDataSource } from '@angular/material/table';
import { RecenzijaService } from '../recenzija.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilmService } from '../../filmovi/film.service';

import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-recenzija',
  standalone: false,
  templateUrl: './list-recenzija.component.html',
  styleUrl: './list-recenzija.component.scss',
})
export class ListRecenzijaComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['film', 'ocena', 'utisak', 'datum', 'actions'];
  dataSource = new MatTableDataSource<Recenzija>([]);

  filmovi: Film[] = [];
  filteredFilmovi: Film[] = [];
  filmControl = new FormControl<number | null>(null);
  filmFilterControl = new FormControl<string>('');
  constructor(
    private recenzijaService: RecenzijaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    this.loadFilmovi();
    this.initFilmFilter();
    this.initFilmSelection();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private loadFilmovi(): void {
    this.filmService.getAllFilmovi().subscribe({
      next: (filmovi) => {
        this.filmovi = filmovi;
        this.filteredFilmovi = filmovi.slice();
      },
      error: () => {
        this.snackBar.open('Greška pri dohvatanju filmova.', 'Zatvori', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        });
      },
    });
  }

  private initFilmFilter(): void {
    this.filmFilterControl.valueChanges.subscribe((value) => {
      const search = (value || '').toLowerCase();
      this.filteredFilmovi = this.filmovi.filter((f) =>
        f.naziv.toLowerCase().includes(search)
      );
    });
  }

  private initFilmSelection(): void {
    this.filmControl.valueChanges.subscribe((filmId) => {
      if (filmId != null) {
        this.loadRecenzijeForFilm(filmId);
      } else {
        this.dataSource.data = [];
      }
    });
  }

  private loadRecenzijeForFilm(filmId: number, showSnackBar:boolean=true): void {
    this.recenzijaService.getRecenzijeByFilm(filmId).subscribe({
      next: (list) => {
         if (!showSnackBar) {
        return; 
      }

        this.dataSource.data = list;
        
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (!list || list.length === 0) {
          this.snackBar.open('Nema recenzija za zadati kriterijum pretrage.', 'Zatvori', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snack-error'],
          });
        }else{
          this.snackBar.open('Pronađene su recenzije.', 'Zatvori', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snack-success'],
          });
        }
      },
      error: () => {
        this.snackBar.open('Greška pri dohvatanju recenzija.', 'Zatvori', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        });
      },
    });
  }

  confirmDelete(row: Recenzija): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Brisanje recenzije',
        message: `Da li ste sigurni da želite da obrišete recenziju za film "${row.film?.naziv}"?`,
        confirmText: 'Obriši',
        cancelText: 'Odustani',
      },
    });

    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;

      this.recenzijaService.deleteRecenzija(row.id).subscribe({
        next: () => {
          const filmId = this.filmControl.value;
          if (filmId != null) {
            this.loadRecenzijeForFilm(filmId, false);
          } else {
            this.dataSource.data = [];
          }

          this.snackBar.open(`Uspešno obrisana recenzija.`, 'OK', {
            duration: 3000,
            panelClass: ['snack-success'],
            horizontalPosition: 'right',
            verticalPosition:'bottom'

          });
        },
        error: () => {
          this.snackBar.open('Greška pri brisanju recenzije.', 'Zatvori', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snack-error'],
          });
        },
      });
    });
  }

  showOnlySnippet(s: string, n = 80): string {
    if (!s) {
      return '';
    }
    return s.length > n ? s.slice(0, n) + '…' : s;
  }
}
