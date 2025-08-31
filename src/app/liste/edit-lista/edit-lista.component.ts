import { Component, ViewChild } from '@angular/core';
import { Lista } from '../../model/app.model';
import { MatDialog } from '@angular/material/dialog';
import { ListaService } from '../lista.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListaEditDialogComponent } from '../lista-edit-dialog/lista-edit-dialog.component';

@Component({
  selector: 'app-edit-lista',
  standalone: false,
  templateUrl: './edit-lista.component.html',
  styleUrl: './edit-lista.component.scss'
})
export class EditListaComponent {
 displayedColumns = ['naziv', 'datum', 'count', 'actions'];

  dataSource = new MatTableDataSource<Lista>([]);
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private listaService: ListaService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void { this.load(); }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

    this.dataSource.filterPredicate = (row, filter) =>
      (row.nazivListe || '').toLowerCase().includes(filter.trim().toLowerCase());
  }

  load(): void {
    this.loading = true;
    this.listaService.getAllListe().subscribe({
      next: (liste) => {
        this.dataSource.data = liste || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snack.open('Greška pri učitavanju lista.', 'Zatvori', { duration: 3000 });
      }
    });
  }

  applyFilter(val: string | null): void {
    this.dataSource.filter = val ?? '';
    if (this.paginator) this.paginator.firstPage();
  }

  applyTableFilterValue(val: string): void {
  this.dataSource.filter = (val || '').trim().toLowerCase();
  this.paginator?.firstPage();
}

  openEdit(row: Lista) {
    const ref = this.dialog.open(ListaEditDialogComponent, {
      width: '900px',
      maxHeight: '90vh',
      data: row 
    });

    ref.afterClosed().subscribe((changed) => {
      if (changed) this.load();  
    });
  }
}
