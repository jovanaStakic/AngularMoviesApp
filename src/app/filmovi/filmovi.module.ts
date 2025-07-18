import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmoviRoutingModule } from './filmovi-routing.module';
import {NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CreateFilmComponent } from './create-film/create-film.component';
import {MatDatepickerInput, MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption }  from '@angular/material/core'; 
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    CreateFilmComponent
  ],
  imports: [
    CommonModule,
    FilmoviRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDatepickerInput,
    MatHint,
    MatIcon,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOption,
    MatSnackBarModule
  ],
  providers:[  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CreateFilmComponent),
    multi: true,
  }]
})
export class FilmoviModule { }
