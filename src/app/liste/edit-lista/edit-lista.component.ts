import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Lista } from '../../model/app.model';
import { MatDialog } from '@angular/material/dialog';
import { ListaService } from '../lista.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListaEditDialogComponent } from '../lista-edit-dialog/lista-edit-dialog.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-lista',
  standalone: false,
  templateUrl: './edit-lista.component.html',
  styleUrl: './edit-lista.component.scss',
})
export class EditListaComponent implements OnInit, AfterViewInit{
  displayedColumns = ['naziv', 'datum', 'count', 'actions'];

  dataSource = new MatTableDataSource<Lista>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchControl = new FormControl<string>('');
  constructor(
    private listaService: ListaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(): void {
  const naziv = (this.searchControl.value || '').trim();

  if (!naziv) {
    this.dataSource.data = [];
    this.paginator?.firstPage();
    this.snackBar.open('Unesite naziv liste za pretragu.', 'Zatvori', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    return;
  }

  this.listaService.searchListe(naziv).subscribe({
    next: (liste) => {
      this.dataSource.data = liste || [];
      this.paginator?.firstPage();

      if (!liste || liste.length === 0) {
        this.snackBar.open('Nema lista za zadati kriterijum pretrage.', 'Zatvori', {
          duration: 3000,
          panelClass: ['snack-erorr'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    },
    error: () => {
      this.snackBar.open('Greška prilikom učitavanja lista.', 'Zatvori', {
        duration: 3000,
        panelClass: ['snack-erorr'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  });
}



  openEdit(row: Lista) {
    const ref = this.dialog.open(ListaEditDialogComponent, {
      width: '900px',
      maxHeight: '90vh',
      data: row,
    });

    ref.afterClosed().subscribe((changed) => {
      if (changed){
        this.search();
      } 
    });
  }
}
