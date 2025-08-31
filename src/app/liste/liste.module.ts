import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ListeRoutingModule } from './liste-routing.module';
import { CreateListaComponent } from './create-lista/create-lista.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { SearchListaComponent } from './search-lista/search-lista.component';
import { ListListaComponent } from './list-lista/list-lista.component';
import { ListaDetailsDialogComponent } from './lista-details-dialog/lista-details-dialog.component';
import { EditListaComponent } from './edit-lista/edit-lista.component';
import { ListaEditDialogComponent } from './lista-edit-dialog/lista-edit-dialog.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    CreateListaComponent,
    SearchListaComponent,
    ListListaComponent,
    ListaDetailsDialogComponent,
    EditListaComponent,
    ListaEditDialogComponent
  ],
  imports: [
    CommonModule,
    ListeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatTableModule, 
    MatPaginatorModule,
    MatProgressBarModule
  ]
})
export class ListeModule { }
