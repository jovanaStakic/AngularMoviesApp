import { Component, ViewChild } from '@angular/core';
import { CreateLista, Film } from '../../model/app.model';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SearchFilmComponent } from '../../shared/search-film/search-film.component';
import { ListaService } from '../lista.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-lista',
  standalone: false,
  templateUrl: './create-lista.component.html',
  styleUrl: './create-lista.component.scss',
})
export class CreateListaComponent {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  listaForm!: FormGroup;
  selectedFilmoviColumns = ['rb', 'naziv', 'zanr', 'reziser', 'actions'];
  selectedFilmovi = new MatTableDataSource<Film>([]);

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private listaService: ListaService
  ) {}

  ngOnInit(): void {
    this.listaForm = this.fb.group({
      naziv: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  openFilmSearch(): void {
    const ref = this.dialog.open(SearchFilmComponent, {
      width: '90vw',
      maxWidth: '1200px',
      height: '85vh',
      maxHeight: '85vh',
      panelClass: 'wide-film-dialog',
      data: { mode: 'multi' }
    });

    ref.afterClosed().subscribe((filmovi: Film[] | undefined) => {
      if (!filmovi) return;

      this.addFilmsToList(filmovi);
    });
  }

  private addFilmsToList(filmovi: Film[]): void {
  const current = this.selectedFilmovi.data;
  const existingIds = new Set(current.map(f => f.id));

  const novi = filmovi.filter(f => !existingIds.has(f.id));
  const duplikati = filmovi.filter(f => existingIds.has(f.id));

  if (novi.length > 0) {
    this.selectedFilmovi.data = [...current, ...novi];
  }

  if (duplikati.length > 0) {
    if (duplikati.length === 1) {
      this.snackBar.open(
        `Film "${duplikati[0].naziv}" je već u listi i nije ponovo dodat.`,
        'OK',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        }
      );
    } else {
      this.snackBar.open(
        `Neki od izabranih filmova su već u listi i nisu ponovo dodati.`,
        'OK',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        }
      );
    }
  }
}
  removeFilm(film: Film): void {
    this.selectedFilmovi.data = this.selectedFilmovi.data.filter(
      (x) => x.id !== film.id
    );
  }

  clearAll(): void {
    this.selectedFilmovi.data = [];
  }

  saveLista(): void {
    if (this.listaForm.invalid || this.selectedFilmovi.data.length === 0) {
      this.snackBar.open('Popuni naziv i/ili dodaj bar jedan film.', 'OK', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snack-error'],
      });
      return;
    }

    const lista: CreateLista = {
      nazivListe: this.listaForm.value.naziv,
      filmovi: this.selectedFilmovi.data.map((f) => f.id),
    };

    this.listaService.saveLista(lista).subscribe({
      next: (saved) => {
        this.selectedFilmovi.data = [];
        this.snackBar.open(
          `Uspešno kreirana lista: ${saved.nazivListe}`,
          'OK',
          {
            duration: 3000,
            panelClass: ['snack-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
        this.resetForm();
      },
      error: () => {
        this.snackBar.open('Greška prilikom brisanja liste.', 'Zatvori', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        });
      },
    });
  }

  resetForm() {
    this.selectedFilmovi.data = [];
    this.listaForm.reset();
    if (this.formGroupDirective) {
      this.formGroupDirective.resetForm();
    }
  }
}
