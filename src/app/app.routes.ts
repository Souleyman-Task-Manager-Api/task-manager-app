import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Signup } from './signup/signup';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: Signup },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/create', component: TaskFormComponent },
  { path: 'tasks/edit/:id', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];