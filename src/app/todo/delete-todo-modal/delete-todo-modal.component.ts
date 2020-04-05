import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-delete-todo-modal',
  templateUrl: './delete-todo-modal.component.html',
  styleUrls: ['./delete-todo-modal.component.css']
})
export class DeleteTodoModalComponent implements OnInit {

  @Input() todo;
  errorMessage: string = '';

  constructor(public activeModal:NgbActiveModal, private todoService: TodosService) { }

  ngOnInit() {
  }

    performDelete(){
      this.todoService.deleteTodo(this.todo._id).subscribe(
        () => {
          this.activeModal.close(this.todo);
        },
        () => {
          this.errorMessage = "Failed to Delete Todo";
        }
      );
    }
}
