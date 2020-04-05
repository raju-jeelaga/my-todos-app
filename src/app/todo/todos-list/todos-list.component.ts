import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../interfaces/todo';
import { TodosService } from '../todos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteTodoModalComponent } from '../delete-todo-modal/delete-todo-modal.component';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  todos: ITodo[];
  todoListSubscriber: any;
  successMessage: string = '';
  isLoading: boolean = false;
  
  constructor(private todosService: TodosService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadTodos();

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
