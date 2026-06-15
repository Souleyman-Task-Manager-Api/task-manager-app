import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-task-list',
  standalone: true,  // ← AJOUTER
  imports: [CommonModule, RouterModule],  // ← AJOUTER
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.api.getTasks().subscribe((res: any) => this.tasks = res);
  }

  deleteTask(id: string) {
    if (confirm('Supprimer cette tâche ?')) {
      this.api.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }

  completeTask(id: string) {
    this.api.completeTask(id).subscribe(() => this.loadTasks());
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}