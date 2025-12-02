import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CreateRecenzija, Film } from '../../model/app.model';
import { MatDialog } from '@angular/material/dialog';
import { SearchFilmComponent } from '../../shared/search-film/search-film.component';
import { RecenzijaService } from '../recenzija.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-recenzija',
  standalone: false,
  templateUrl: './create-recenzija.component.html',
  styleUrl: './create-recenzija.component.scss',
})
export class CreateRecenzijaComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  recenzijaForm!: FormGroup;
  ratings: Number[] = [...Array(10)].map((_, i) => i + 1);
  selectedFilm!: Film | null;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private recenzijaService: RecenzijaService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.recenzijaForm = this.fb.group({
      film: [null, Validators.required],
      ocena: [
        null,
        [Validators.min(1), Validators.max(10), Validators.required],
      ],
      utisak: ['', [Validators.required]],
    });
  }

  openFilmSearch() {
    const dialogRef = this.dialog.open(SearchFilmComponent, {
      width: '90vw',
      maxWidth: '1200px',
      height: '85vh',
      maxHeight: '85vh',
      panelClass: 'wide-film-dialog',
      data: { mode: 'single' }
    });
    dialogRef.afterClosed().subscribe((film: Film) => {
      if (film) {
        this.selectedFilm = film;
        this.recenzijaForm.get('film')!.setValue(film);
      }
    });
  }

  clearFilm(): void {
    this.selectedFilm = null;
    this.recenzijaForm.get('film')!.reset();
  }
  saveRecenzija() {
    const recenzija: CreateRecenzija = {
      filmId: this.selectedFilm?.id ?? 0,
      ocenaFilma: this.recenzijaForm.value.ocena,
      utisak: this.recenzijaForm.value.utisak,
    };
    this.recenzijaService.saveRecenzija(recenzija).subscribe({
      next: (created) => {
         this.snackBar.open(`Uspešno sačuvana recenzija.`,"OK",
          { duration: 3000, panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'top'});
            this.resetForm();
      },
      error: ()=>{
        this.snackBar.open('Greška pri čuvanju recenzije.', 'Zatvori', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        });
      }
    });
  }

  resetForm() {
    this.selectedFilm=null;
    this.recenzijaForm.reset();
    if (this.formGroupDirective) {
      this.formGroupDirective.resetForm();
    }
  }
}
