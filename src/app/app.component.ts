import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div style="padding:20px;font-family:Arial">
      <h1>📋 Task Manager</h1>

      <div *ngIf="!isLoggedIn">
        <h2>Connexion</h2>
        <input [(ngModel)]="username" placeholder="Nom"><br><br>
        <input type="password" [(ngModel)]="password" placeholder="Mot de passe"><br><br>
        <button (click)="login()">Se connecter</button>
        <p style="color:red">{{errorMessage}}</p>
      </div>

      <div *ngIf="isLoggedIn">
        <h2>Bienvenue {{username}} !</h2>

        <div style="display:flex; gap:20px; margin:20px 0">
          <div style="background:#667eea; color:white; padding:20px; border-radius:10px">
            <h3>Total</h3>
            <p style="font-size:30px">{{stats.total||0}}</p>
          </div>
          <div style="background:#28a745; color:white; padding:20px; border-radius:10px">
            <h3>Terminées</h3>
            <p style="font-size:30px">{{stats.completed||0}}</p>
          </div>
          <div style="background:#ffc107; padding:20px; border-radius:10px">
            <h3>En attente</h3>
            <p style="font-size:30px">{{stats.pending||0}}</p>
          </div>
        </div>

        <div style="margin:20px 0">
          <input [(ngModel)]="newTitle" placeholder="Nouvelle tâche" style="padding:8px">
          <button (click)="addTask()" style="padding:8px 16px; margin-left:10px">➕ Ajouter</button>
        </div>

        <div *ngFor="let task of tasks" style="border-bottom:1px solid #ddd; padding:10px 0">
          <strong>{{task.title}}</strong> - {{task.status}}
          <button *ngIf="task.status !== 'COMPLETED'" (click)="complete(task.id)" style="margin-left:10px">✅ Terminer</button>
          <button (click)="deleteTask(task.id)">🗑️ Supprimer</button>
        </div>

        <button (click)="logout()" style="margin-top:20px; background:#dc3545; color:white; padding:8px 16px">Déconnexion</button>
      </div>
    </div>
  `
})
export class AppComponent {
  isLoggedIn = false;
  username = '';
  password = '';
  errorMessage = '';
  token = '';
  stats: any = {};
  tasks: any[] = [];
  newTitle = '';

  constructor(private http: HttpClient) {}

  login() {
    this.http.post('http://localhost:3000/account/signin', {
      username: this.username,
      password: this.password,
      socialLogin: false
    }).subscribe({
      next: (res: any) => {
        this.token = res.token;
        this.isLoggedIn = true;
        this.loadData();
      },
      error: () => this.errorMessage = 'Identifiants incorrects'
    });
  }

  loadData() {
    this.http.get('http://localhost:3000/tasks/public-stats').subscribe({
      next: (data: any) => this.stats = data
    });
    const headers = { headers: { Authorization: 'Bearer ' + this.token } };
    this.http.get('http://localhost:3000/tasks', headers).subscribe({
      next: (data: any) => this.tasks = data
    });
  }

  addTask() {
    if (!this.newTitle) return;
    const headers = { headers: { Authorization: 'Bearer ' + this.token } };
    this.http.post('http://localhost:3000/tasks', { title: this.newTitle, description: '' }, headers).subscribe({
      next: () => {
        this.newTitle = '';
        this.loadData();
      }
    });
  }

  complete(id: string) {
    const headers = { headers: { Authorization: 'Bearer ' + this.token } };
    this.http.put(`http://localhost:3000/tasks/${id}/complete`, {}, headers).subscribe({
      next: () => this.loadData()
    });
  }

  deleteTask(id: string) {
    if (!confirm('Supprimer cette tâche ?')) return;
    const headers = { headers: { Authorization: 'Bearer ' + this.token } };
    this.http.delete(`http://localhost:3000/tasks/${id}`, headers).subscribe({
      next: () => this.loadData()
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.token = '';
  }
}
