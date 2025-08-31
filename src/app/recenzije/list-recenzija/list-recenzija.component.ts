import { Component, ViewChild } from '@angular/core';
import { Recenzija } from '../../model/app.model';
import { MatTableDataSource } from '@angular/material/table';
import { RecenzijaService } from '../recenzija.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-recenzija',
  standalone: false,
  templateUrl: './list-recenzija.component.html',
  styleUrl: './list-recenzija.component.scss',
})
export class ListRecenzijaComponent {
  displayedColumns = ['film', 'ocena', 'utisak', 'datum', 'actions'];
  dataSource = new MatTableDataSource<Recenzija>([]);

  constructor(
    private recenzijaService: RecenzijaService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.recenzijaService.getRecenzije().subscribe({
      next: (list) => {
        this.dataSource.data = list;
      },
      error: () => {
        this.snack.open('Greška pri učitavanju recenzija.', 'Zatvori', {
          duration: 3000,
        });
      },
    });
  }

  confirmDelete(row: Recenzija): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Brisanje recenzije',
        message: `Da li ste sigurni da želite da obrišete recenziju za film "${row.film?.naziv}"?`,
        confirmText: 'Obriši',
        cancelText: 'Odustani',
      },
    });

    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;

      this.recenzijaService.deleteRecenzija(row.id).subscribe({
        next: () => {
          this.snack.open('Recenzija obrisana.', 'OK', { duration: 2000 });
          this.load();
        },
        error: () => {
          this.snack.open('Brisanje nije uspelo.', 'Zatvori', {
            duration: 3000,
          });
        },
      });
    });
  }

  truncate(s: string, n = 80): string {
    if (!s) return '';
    return s.length > n ? s.slice(0, n) + '…' : s;
  }
}
