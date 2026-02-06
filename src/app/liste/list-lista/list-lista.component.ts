import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { Film, Lista } from '../../model/app.model';
import { ListaService } from '../lista.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ListaDetailsDialogComponent } from '../lista-details-dialog/lista-details-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

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

  searchControl = new FormControl<string>('');
  constructor(
    private listaService: ListaService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  search(): void {
  const naziv = (this.searchControl.value || '').trim();

  if (!naziv) {
    this.dataSource.data = [];
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.snack.open('Unesite naziv liste za pretragu.', 'Zatvori', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    return;
  }

  this.listaService.searchListe(naziv).subscribe({
    next: (liste: Lista[]) => {
      this.dataSource.data = liste || [];
      
      if (this.paginator) {
        this.paginator.firstPage();
      }

      
    },
    error: () => {
      this.snack.open('Greška pri učitavanju lista.', 'Zatvori', {
        duration: 3000,
        panelClass: ['snack-erorr'],
        horizontalPosition: 'right',
        verticalPosition: 'top',
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
          this.snack.open(`Uspešno obrisana lista.`, 'OK', {
            duration: 3000,
            panelClass: ['snack-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.search(); 
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
