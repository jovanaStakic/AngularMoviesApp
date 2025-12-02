import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { Film, Lista } from '../../model/app.model';
import { ListaService } from '../lista.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ListaDetailsDialogComponent } from '../lista-details-dialog/lista-details-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-lista',
  standalone: false,
  templateUrl: './list-lista.component.html',
  styleUrl: './list-lista.component.scss',
})
export class ListListaComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
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
        panelClass: 'app-confirm-dialog',   
  backdropClass: 'app-dialog-backdrop'
      },
    });

    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;

      this.listaService.deleteLista(row.id).subscribe({
        next: () => {
          this.snack.open(`Lista  uspešno obrisana.`, 'OK', {
            duration: 3000,
            panelClass: ['snack-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.load();
        },
        error: () => {
          this.snack.open('Greška prilikom brisanja liste.', 'Zatvori', {
            duration: 3000,
            panelClass: ['snack-erorr'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
    });
  }

  openDetails(row: Lista) {
    
    this.dialog.open(ListaDetailsDialogComponent, {
      width: '720px',
      maxHeight: '85vh',
      data: row,
    });
  }
}
