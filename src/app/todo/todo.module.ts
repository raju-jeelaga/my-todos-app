import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';
import { TodosService } from './todos.service';
import { DeleteTodoModalComponent } from './delete-todo-modal/delete-todo-modal.component';


@NgModule({
  declarations: [TodosListComponent, AddEditTodoComponent, DeleteTodoModalComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [TodosService],
  entryComponents: [DeleteTodoModalComponent]
})
export class TodoModule { }
