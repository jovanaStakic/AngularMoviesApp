import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecenzijeRoutingModule } from './recenzije-routing.module';
import { CreateRecenzijaComponent } from './create-recenzija/create-recenzija.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { ListRecenzijaComponent } from './list-recenzija/list-recenzija.component';


@NgModule({
  declarations: [
    CreateRecenzijaComponent,
    ListRecenzijaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecenzijeRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTableModule
  ]
})
export class RecenzijeModule { }
