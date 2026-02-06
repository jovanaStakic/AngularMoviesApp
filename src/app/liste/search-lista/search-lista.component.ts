import { Component, ElementRef, ViewChild } from '@angular/core';
import { Film, Lista } from '../../model/app.model';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ListaService } from '../lista.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-lista',
  standalone: false,
  templateUrl: './search-lista.component.html',
  styleUrl: './search-lista.component.scss',
})
export class SearchListaComponent {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  @ViewChild('resultsCard') resultsCard!: ElementRef;
  searchForm!: FormGroup;
  

  listColumns = ['naziv', 'datum', 'count', 'actions'];
  filmColumns = ['rb', 'naziv', 'zanr', 'reziser'];

  resultsData = new MatTableDataSource<Lista>([]);
  filmsData = new MatTableDataSource<Film>([]);

  selectedLista: Lista | null = null;

  constructor(
    private fb: FormBuilder,
    private listaService: ListaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      naziv: ['', []],
    });
  }

  search(): void {
    const naziv = this.searchForm.value.naziv;
   
    this.selectedLista = null;
    this.filmsData.data = [];

    this.listaService.searchListe(naziv).subscribe({
      next: (liste) => {
        if (!liste || liste.length === 0) {
          this.snackBar.open('Nema lista za zadati kriterijum pretrage.', 'Zatvori', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snack-error'],
          });
        }else{
        this.snackBar.open(`Liste su uspešno pronadjene.`, 'OK', {
          duration: 3000,
          panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.resultsData.data = liste ;
      }
      },
      error: () => {
        this.resultsData.data = [];
        this.snackBar.open('Nema lista za zadati kriterijum pretrage.', 'Zatvori', {
          duration: 3000,
          panelClass: ['snack-erorr'],
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  clear(): void {
    this.resultsData.data = [];
    this.selectedLista = null;
    this.filmsData.data = [];
    this.resetForm();
  }

  select(lista: Lista): void {
    this.selectedLista = lista;
    this.filmsData.data = lista.filmovi || [];
    setTimeout(() => {
          this.resultsCard.nativeElement
            .scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
  }

  resetForm() {
    this.searchForm.reset();
    if (this.formGroupDirective) {
      this.formGroupDirective.resetForm();
    }
  }
}
