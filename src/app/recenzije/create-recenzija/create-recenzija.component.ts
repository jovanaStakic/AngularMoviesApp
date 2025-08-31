import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateRecenzija, Film } from '../../model/app.model';
import { MatDialog } from '@angular/material/dialog';
import { SearchFilmComponent } from '../../shared/search-film/search-film.component';
import { RecenzijaService } from '../recenzija.service';

@Component({
  selector: 'app-create-recenzija',
  standalone: false,
  templateUrl: './create-recenzija.component.html',
  styleUrl: './create-recenzija.component.scss',
})
export class CreateRecenzijaComponent implements OnInit {
  recenzijaForm!: FormGroup;
  ratings: Number[] = [...Array(10)].map((_, i) => i + 1);
  selectedFilm!: Film | null;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private recenzijaService: RecenzijaService
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.recenzijaForm = this.fb.group({
      film: [null, Validators.required],
      ocena: [null, [Validators.min(1), Validators.max(10), Validators.required]],
      utisak: ['', [Validators.required]],
    });
  }

  openFilmSearch() {
    const dialogRef = this.dialog.open(SearchFilmComponent,{
       width: '90vw',   
    maxWidth: '1200px',   
    height: '85vh',      
    maxHeight: '85vh',
    panelClass: 'wide-film-dialog'
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
        console.log('Sacuvano');
      },
    });
  }
}
