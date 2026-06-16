import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  form = { title: '', description: '', priority: 'MEDIUM' };
  isEditMode = false;
  taskId: string | null = null;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.isEditMode = true;
      this.api.getTask(this.taskId).subscribe((res: any) => {
        this.form = {
          title: res.title,
          description: res.description,
          priority: res.priority
        };
      });
    }
  }

  saveTask() {
    if (!this.form.title) return;

    if (this.isEditMode && this.taskId) {
      this.api.updateTask(this.taskId, this.form).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.api.createTask(this.form).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}