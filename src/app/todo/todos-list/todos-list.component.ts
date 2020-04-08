import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../interfaces/todo';
import { TodosService } from '../todos.service';
import { fromEvent, Observable } from 'rxjs';
import { map, debounceTime, switchMap, tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteTodoModalComponent } from '../delete-todo-modal/delete-todo-modal.component';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  todos: ITodo[];
  search$: Observable<ITodo[]>;
  todoListSubscriber: any;
  searchSubscriber: any;
  isLoading: boolean = false;
  successMessage: string = '';
  
  constructor(private todosService: TodosService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadTodos();

    /** Search todo feature */
    let searchBox = document.getElementById('search-box');
    this.search$ = fromEvent(searchBox, 'input').pipe(
      tap(event => console.log(event)),
      map((event: KeyboardEvent) => {
        // return event.target.value; // We will get compilation error.
        return (<HTMLInputElement>event.target).value;
        // return event.target['value']; // We can do like this also to avoid TS compilation errors.
      }),
      tap(value => console.log(value)),
      debounceTime(250),
      switchMap(text => {
        this.isLoading = true;
        return this.todosService.getTodos(text);
      })
    );

    this.searchSubscriber = this.search$.subscribe((data: ITodo[]) => {
      this.isLoading = false;
      this.todos = data;
      console.log(this.todos);
    });

  }

  loadTodos() {
    this.isLoading = true;
    this.todoListSubscriber = this.todosService.getTodos()
      .subscribe((data: ITodo[]) => {
        this.todos = data;
        this.isLoading = false;
        console.log(this.todos);
      });
  }

    confirmDelete(todo){
      let deleteModalReference = this.modalService.open(DeleteTodoModalComponent, {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'delete-modal'
      });

      deleteModalReference.componentInstance.todo = todo;
      deleteModalReference.result.then( (result) => {
        console.log(result);
        this.loadTodos();
        this.successMessage = 'Todo Delete Successfully';
      }, (reason) => {
        console.log(reason);
        console.log('Modal dismissed');
      });
      
      
    }

}
