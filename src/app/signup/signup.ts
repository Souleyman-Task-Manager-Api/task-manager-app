import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-signup',
  standalone: true,  // ← AJOUTER
  imports: [CommonModule, FormsModule],  // ← AJOUTER
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  username = '';
  password = '';
  mail = '';
  error = '';
  success = false;

  constructor(private api: ApiService, private router: Router) {}

  signup() {
    this.api.signup({ username: this.username, password: this.password, mail: this.mail })
      .subscribe({
        next: (res: any) => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err: any) => this.error = err.error?.message || 'Erreur lors de l\'inscription'
      });
  }
}