import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CreateFilm,
  Glumac,
  Reziser,
  Uloga,
  Zanr,
} from '../../model/app.model';
import { FilmService } from '../film.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-film',
  standalone: false,
  templateUrl: './create-film.component.html',
  styleUrl: './create-film.component.scss',
})
export class CreateFilmComponent implements OnInit {
  maxDate!: Date;
  filmForm!: FormGroup;
  zanrovi: Zanr[] = [];
  reziseri: Reziser[] = [];
  glumci: Glumac[] = [];

  constructor(
    private fb: FormBuilder,
    private filmService: FilmService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.prefillData();
    this.buildForm();
  }

  private prefillData() {
    this.filmService.getZanrovi().subscribe((z) => {
      this.zanrovi = z;
    });
    this.filmService.getReziseri().subscribe((r) => {
      this.reziseri = r;
    });
    this.filmService.getGlumci().subscribe((g) => {
      this.glumci = g;
    });
  }

  private buildForm(): void {
    this.filmForm = this.fb.group({
      naziv: ['', [Validators.required, Validators.maxLength(255)]],
      datumIzlaska: [null, [Validators.required]],
      trajanjeFilma: [0, [Validators.required, Validators.min(1)]],
      drzavaPorekla: ['', [Validators.required]],
      zanr: [null, [Validators.required]],
      reziser: [null, [Validators.required]],
      uloge: this.fb.array([], Validators.required),
    });
  }

  get ulogeArray(): FormArray {
    return this.filmForm.get('uloge') as FormArray;
  }

  addUloga(): void {
    this.ulogeArray.push(
      this.fb.group({
        glumacId: [null, Validators.required],
        nazivUloge: ['', Validators.required],
      })
    );
  }

  removeUloga(index: number): void {
    this.ulogeArray.removeAt(index);
  }

  saveFilm(): void {
    if (this.filmForm.invalid) {
      this.filmForm.markAllAsTouched();
      return;
    }

    this.filmService.saveFilm(this.populateFilmObject()).subscribe({
      next: (created) => {
        this.snackBar.open(`Film ${created.naziv} je uspešno sačuvan!`, 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-success']
        });

        this.resetForm();
      },
      error: () => {
        this.snackBar.open('Greška pri čuvanju filma.', 'Zatvori', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        });
      }
    });
  }

  populateFilmObject(): CreateFilm {
    const film: CreateFilm = {
      naziv: this.filmForm.value.naziv,
      datumIzlaska: this.filmForm.value.datumIzlaska,
      trajanjeFilma: this.filmForm.value.trajanjeFilma,
      drzavaPorekla: this.filmForm.value.drzavaPorekla,
      zanrId: this.filmForm.value.zanr,
      reziserId: this.filmForm.value.reziser,

      uloge: (this.filmForm.value.uloge as any[]).map((u) => ({
        glumacId: u.glumacId,
        nazivUloge: u.nazivUloge,
      })) as Uloga[],
    };

    return film;
  }

  resetForm() {
    this.ulogeArray.clear();
    this.filmForm.reset();
    this.filmForm.markAsPristine();
    this.filmForm.markAsUntouched();
  }
}
