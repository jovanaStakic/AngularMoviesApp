import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm:FormGroup= new FormGroup({
    ime: new FormControl(''),
    prezime: new FormControl(''),
    korisnickoIme: new FormControl(''),
    sifra: new FormControl('')
  })

  constructor(private authService:AuthService,private router:Router) { 
  }

   register(){
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
    console.log(response);
    this.router.navigate(['/home']);
   }
  });
  }
}


