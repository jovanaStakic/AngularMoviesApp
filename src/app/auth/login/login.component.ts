import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    korisnickoIme: new FormControl(''),
    sifra: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router,private snackBar:MatSnackBar) {}

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.snackBar.open("Uspešno prijavljivanje.","OK",{ duration: 3000, panelClass: ['snack-success'],
          horizontalPosition: 'right',
          verticalPosition: 'top'});
        this.router.navigate(['/home']);
      },
      error:(error)=>{
        this.snackBar.open('Neuspešno prijavljivanje.',"Zatvori",
          { duration: 3000, panelClass: ['snack-error'],
          horizontalPosition: 'right',
          verticalPosition: 'top'});
      }
    });
  }
}
