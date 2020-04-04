import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../interfaces/todo';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  todos: ITodo[] = []; 
  isLoading: boolean = false;
  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.todosService.getTodos().subscribe((data:ITodo[] ) => {
    this.isLoading = false; 
    this.todos = data;
    console.log('Data Received', this.todos);
    });
  }

}
