import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,  // ← AJOUTER
  imports: [CommonModule, FormsModule],  // ← AJOUTER
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.signin({ username: this.username, password: this.password, socialLogin: false })
      .subscribe({
        next: (res: any) => {
          if (res.token) localStorage.setItem('token', res.token);
          this.router.navigate(['/tasks']);
        },
        error: () => this.error = 'Identifiants invalides'
      });
  }
}