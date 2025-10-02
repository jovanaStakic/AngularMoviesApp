import { Component } from '@angular/core';
import { CreateLista, Film } from '../../model/app.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  listaForm!: FormGroup;
  selectedColumns = ['rb', 'naziv', 'zanr', 'reziser', 'actions'];
  selectedData = new MatTableDataSource<Film>([]);

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
    });

    ref.afterClosed().subscribe((film: Film | undefined) => {
      if (!film) return;

      if (this.selectedData.data.some((f) => f.id === film.id)) {
        this.snackBar.open('Taj film je već u listi.', 'OK', { duration: 2000 ,
          horizontalPosition: 'right',
          verticalPosition: 'top'});
        return;
      }

      this.selectedData.data = [...this.selectedData.data, film];
    });
  }

  removeFilm(film: Film): void {
    this.selectedData.data = this.selectedData.data.filter(
      (x) => x.id !== film.id
    );
  }

  clearAll(): void {
    this.selectedData.data = [];
  }

  saveLista(): void {
    if (this.listaForm.invalid || this.selectedData.data.length === 0) {
      this.listaForm.markAllAsTouched();
      this.snackBar.open('Popuni naziv i dodaj bar jedan film.', 'OK', {
        duration: 2500,
        horizontalPosition: 'right',
          verticalPosition: 'top'
      });
      return;
    }

    const lista: CreateLista = {
      nazivListe: this.listaForm.value.naziv,
      filmovi: this.selectedData.data.map((f) => f.id),
    };

    this.listaService.saveLista(lista).subscribe({
       next: (saved) => {
       this.listaForm.reset();
        this.selectedData.data = [];
         this.snackBar.open(`Uspešno kreirana lista: ${saved.nazivListe}`,"OK",
          { duration: 3000, panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'top'});
     
      },
      error: ()=>{
        this.snackBar.open('Greška pri brisanju liste.', 'Zatvori', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        });
      }
 
     
    });
  }
}
