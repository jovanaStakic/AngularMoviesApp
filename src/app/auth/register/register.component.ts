import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    ime: new FormControl(''),
    prezime: new FormControl(''),
    korisnickoIme: new FormControl(''),
    sifra: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router, private snackBar:MatSnackBar) {}

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snackBar.open("Uspešna registracija.","OK",
          { duration: 3000, panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'top'});
        this.router.navigate(['/home']);
      },
      error:()=>{
        this.snackBar.open('Neuspešna registracija.',"Zatvori",
          { duration: 3000, panelClass: ['snack-error'],
          horizontalPosition: 'right',
          verticalPosition: 'top'});
      }
    });
  }
}
