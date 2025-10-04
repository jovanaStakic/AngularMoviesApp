import { Component, Inject, ViewChild } from '@angular/core';
import { Film, Lista, UpdateLista } from '../../model/app.model';
import { SearchFilmComponent } from '../../shared/search-film/search-film.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaService } from '../lista.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-edit-dialog',
  standalone: false,
  templateUrl: './lista-edit-dialog.component.html',
  styleUrl: './lista-edit-dialog.component.scss',
})
export class ListaEditDialogComponent {
  form!: FormGroup;
  filmsDS = new MatTableDataSource<Film>([]);
  displayedColumns = ['rb', 'naziv', 'zanr', 'reziser', 'actions'];

  
  saving = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Lista,
    private ref: MatDialogRef<ListaEditDialogComponent>,
    private fb: FormBuilder,
    private listaService: ListaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const initial = this.data;
    this.form = this.fb.group({
      naziv: [
        initial.nazivListe,
        [Validators.required, Validators.minLength(3)],
      ],
    });
    this.filmsDS.data = [...(initial.filmovi || [])];
  }

  ngAfterViewInit(): void {
    this.filmsDS.paginator = this.paginator;
  }

  openFilmSearch(): void {
    const ref = this.dialog.open(SearchFilmComponent, {
      width: '90vw',
      maxWidth: '1200px',
      height: '85vh',
      maxHeight: '85vh',
      panelClass: 'wide-film-dialog',
    });
    ref.afterClosed().subscribe((film: Film | undefined) => {
      if (!film) return;
      if (this.filmsDS.data.some((f) => f.id === film.id)) {
        this.snackBar.open('Taj film je već u listi.', 'OK', {
          duration: 2000,
        });
        return;
      }
      this.filmsDS.data = [...this.filmsDS.data, film];
      setTimeout(() => this.paginator?.lastPage());
    });
  }

  removeFilm(f: Film): void {
    this.filmsDS.data = this.filmsDS.data.filter((x) => x.id !== f.id);
    if (
      this.paginator &&
      this.filmsDS.data.length <=
        this.paginator.pageIndex * this.paginator.pageSize
    ) {
      this.paginator.previousPage();
    }
  }

  clearAll(): void {
    this.filmsDS.data = [];
  }

  save(): void {
    if (this.form.invalid || this.filmsDS.data.length === 0) {
      this.form.markAllAsTouched();
      this.snackBar.open('Popuni naziv i dodaj bar jedan film.', 'OK', {
        duration: 2500,
      });
      return;
    }

    const payload: UpdateLista = {
      nazivListe: this.form.value.naziv,
      filmovi: [...this.filmsDS.data].map((f) => f.id),
    };

    this.saving = true;
    this.listaService.updateLista(this.data.id, payload).subscribe({
      next: (updated) => {
        this.saving = false;
        this.snackBar.open(
          `Uspešno izmenjena lista: ${updated.nazivListe}`,
          'OK',
          {
            duration: 3000,
            panelClass: ['snack-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }
        );
        const updatedList: Lista = {
          id: this.data.id,
          nazivListe: payload.nazivListe,
          datumKreiranja: this.data.datumKreiranja,

          filmovi: this.filmsDS.data,
        };
        this.ref.close(updated);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('Čuvanje nije uspelo.', 'Zatvori', {
          duration: 3000,
          panelClass: ['snack-erorr'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  close(): void {
    this.ref.close(false);
  }
}
