import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:4000';  // ← CHANGEMENT ICI

  constructor(private http: HttpClient) {}

  // Authentification
  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/signup`, data);
  }

  signin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/signin`, data);
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/account/me`);
  }

  // Tâches
  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks`);
  }

  getTask(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks/${id}`);
  }

  createTask(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks`, data);
  }

  updateTask(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, data);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }

  completeTask(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${id}/complete`, {});
  }
}