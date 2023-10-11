import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  public getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('https://jsonplaceholder.typicode.com/todos');
  }

  public getTask(id: number): Observable<Task> {
    return this.httpClient.get<Task>('https://jsonplaceholder.typicode.com/todos/' + id);
  }

  public addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>('https://jsonplaceholder.typicode.com/todos', task);
  }
}
