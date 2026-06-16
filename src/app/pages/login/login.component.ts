import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    // FORCER LA CONNEXION SANS VÉRIFICATION BACKEND
    // Supprimez ou commentez l'appel API pour tester
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('username', this.username);
    this.router.navigate(['/tasks']);
    
    /* Code original (désactivé temporairement)
    this.api.signin({ username: this.username, password: this.password, socialLogin: false })
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            localStorage.setItem('token', 'dummy-token-for-testing');
            this.router.navigate(['/tasks']);
          } else {
            this.error = 'Identifiants invalides';
          }
        },
        error: () => this.error = 'Identifiants invalides'
      });
    */
  }
}