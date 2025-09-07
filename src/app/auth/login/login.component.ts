import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
      },
    });
  }
}
