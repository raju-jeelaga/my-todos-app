import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITodo } from '../interfaces/todo';
import { environment } from '../../environments/environment';

@Injectable()
export class TodosService {

  apiUrl: string = environment.apiUrl;

  constructor( private http: HttpClient ) { }

  getTodos(searchTerm?: string): Observable<ITodo[]>{
    let url = `${this.apiUrl}/todos`;
    if(searchTerm) {
      url += `?search=${searchTerm}`
    }

    return this.http.get(url)
      .pipe(
        map(response => {
          return response as ITodo[];
        })
      )
  }

  getTodo(todoId: string): Observable<ITodo>{
    return this.http.get(`${this.apiUrl}/todos/${todoId}`)
      .pipe(
        map(response => {
          return response as ITodo;
        })
      )
  }

 deleteTodo(todoId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/todos/${todoId}`);
}


}
