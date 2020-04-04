import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  todos: any[] = []; 
  isLoading: boolean = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.http.get('https://todos-api-dev.herokuapp.com/todos').subscribe((data:any[] ) => {
    this.isLoading = false; 
    this.todos = data;
    console.log('Data Received', this.todos);
    });
  }

}
