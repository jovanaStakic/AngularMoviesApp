import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Film, Lista } from '../../model/app.model';

@Component({
  selector: 'app-lista-details-dialog',
  standalone: false,
  templateUrl: './lista-details-dialog.component.html',
  styleUrl: './lista-details-dialog.component.scss',
})
export class ListaDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Lista,
    private refDialog: MatDialogRef<ListaDetailsDialogComponent>
  ) {}

  trackFilm(_: number, f: Film) {
    return f.id;
  }
  close() {
    this.refDialog.close();
  }
}
