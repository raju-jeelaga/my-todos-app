import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';
import { TodosService } from './todos.service';


@NgModule({
  declarations: [TodosListComponent, AddEditTodoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [TodosService]
})
export class TodoModule { }
