import { Component } from '@angular/core';
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { Film, Lista } from '../../model/app.model';
import { ListaService } from '../lista.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ListaDetailsDialogComponent } from '../lista-details-dialog/lista-details-dialog.component';

@Component({
  selector: 'app-list-lista',
  standalone: false,
  templateUrl: './list-lista.component.html',
  styleUrl: './list-lista.component.scss',
})
export class ListListaComponent {
  displayedColumns = ['naziv', 'datum', 'count', 'detalji', 'actions'];
  dataSource = new MatTableDataSource<Lista>([]);

  constructor(
    private listaService: ListaService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.listaService.getAllListe().subscribe({
      next: (liste: Lista[]) => {
        this.dataSource.data = liste || [];
      },
      error: () => {
        this.snack.open('Greška pri učitavanju lista.', 'Zatvori', {
          duration: 3000,
        });
      },
    });
  }

  confirmDelete(row: Lista): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Brisanje liste',
        message: `Da li ste sigurni da želite da obrišete listu "${row.nazivListe}"?`,
        confirmText: 'Obriši',
        cancelText: 'Odustani',
      },
    });

    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;

      this.listaService.deleteLista(row.id).subscribe({
        next: (deleted) => {
          this.snack.open(`Lista uspešno obrisana.`, 'OK', {
            duration: 3000,
            panelClass: ['snack-erorr'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.load();
        },
        error: () => {
          this.snack.open('Brisanje nije uspelo.', 'Zatvori', {
            duration: 3000,
            panelClass: ['snack-erorr'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
    });
  }

  openDetails(row: Lista, ev?: MouseEvent) {
    ev?.stopPropagation();
    this.dialog.open(ListaDetailsDialogComponent, {
      width: '720px',
      maxHeight: '85vh',
      data: row,
    });
  }
}
