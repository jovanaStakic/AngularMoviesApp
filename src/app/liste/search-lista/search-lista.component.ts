import { Component } from '@angular/core';
import { Film, Lista } from '../../model/app.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaService } from '../lista.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-lista',
  standalone: false,
  templateUrl: './search-lista.component.html',
  styleUrl: './search-lista.component.scss'
})
export class SearchListaComponent {
 searchForm!: FormGroup;
  loading = false;

  listColumns = ['naziv', 'datum', 'count', 'actions'];
  filmColumns = ['rb', 'naziv', 'zanr', 'reziser'];

  resultsDS = new MatTableDataSource<Lista>([]);
  filmsDS   = new MatTableDataSource<Film>([]);

  selectedLista: Lista | null = null;

  constructor(
    private fb: FormBuilder,
    private listaService: ListaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      naziv: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  search(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    const naziv = this.searchForm.value.naziv?.trim();
    this.loading = true;
    this.selectedLista = null;
    this.filmsDS.data = [];

    this.listaService.searchListe(naziv).subscribe({
      next: (liste) => {
        this.snackBar.open(`Liste su uspešno pronadjene.`, 'OK', {
            duration: 3000,
            panelClass: ['snack-erorr'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        this.resultsDS.data = liste || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.resultsDS.data = [];
        this.snackBar.open('Greška prilikom pretrage lista.', 'Zatvori', { duration: 3000,
          panelClass: ['snack-erorr'],
          horizontalPosition: 'right',
          verticalPosition: 'top'  });
      }
    });
  }

  clear(): void {
    this.searchForm.reset();
    this.resultsDS.data = [];
    this.selectedLista = null;
    this.filmsDS.data = [];
  }

  select(lista: Lista): void {
    this.selectedLista = lista;
    this.filmsDS.data = lista.filmovi || [];
  }
}
