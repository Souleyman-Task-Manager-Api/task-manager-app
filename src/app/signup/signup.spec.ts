import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class SignupComponent {
  username = '';
  password = '';
  mail = '';
  error = '';
  success = false;

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  signup() {
    this.api
      .signup({ username: this.username, password: this.password, mail: this.mail })
      .subscribe({
        next: (res: any) => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => (this.error = err.error?.message || "Erreur lors de l'inscription"),
      });
  }
}
