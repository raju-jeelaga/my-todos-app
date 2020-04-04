import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosListComponent } from './todo/todos-list/todos-list.component';
import { AddEditTodoComponent } from './todo/add-edit-todo/add-edit-todo.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'todos-list', component:TodosListComponent},
  { path: 'add-edit', component:AddEditTodoComponent},

  { path: '', redirectTo: 'todos-list', pathMatch:'full'},
  { path: '**', component:PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
