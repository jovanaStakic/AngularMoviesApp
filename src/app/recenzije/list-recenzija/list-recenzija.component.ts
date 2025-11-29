import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Recenzija } from '../../model/app.model';
import { MatTableDataSource } from '@angular/material/table';
import { RecenzijaService } from '../recenzija.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-list-recenzija',
  standalone: false,
  templateUrl: './list-recenzija.component.html',
  styleUrl: './list-recenzija.component.scss',
})
export class ListRecenzijaComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['film', 'ocena', 'utisak', 'datum', 'actions'];
  dataSource = new MatTableDataSource<Recenzija>([]);

  constructor(
    private recenzijaService: RecenzijaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  load(): void {
    this.recenzijaService.getAllRecenzije().subscribe({
       next: (list) => {
         this.dataSource.data = list;
      },
      error: ()=>{
        this.snackBar.open('Greška pri dohvatanju recenzija.', 'Zatvori', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        });
      }
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
      
      next: (deleted) => {
        this.load();
         this.snackBar.open(`Uspešno obrisana recenzija.`,"OK",
          { duration: 3000, panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'top'});
     
      },
      error: ()=>{
        this.snackBar.open('Greška pri brisanju recenzije.', 'Zatvori', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        });
      }
      });
    });
  }

  showOnlySnippet(s: string, n = 80): string {
    if (!s){
       return '';
    }
    return s.length > n ? s.slice(0, n) + '…' : s;
  }
}
