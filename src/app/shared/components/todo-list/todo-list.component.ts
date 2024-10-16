import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { GetToDoListResponse } from '../../models/getToDoListResponse';
import { HttpClient } from '@angular/common/http';
import { CreateToDoRequest } from '../../models/createToDoRequest';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  constructor(private toastr: ToastrService, private httpClient: HttpClient) { }

  toDoRequest: CreateToDoRequest = { id: 400, userId: 32323, title: '', completed: true };
  toDoListFromBackend: GetToDoListResponse[] = []
  searchId?: number

  ngOnInit() {
    this.fetchTodos();
  }

  todoNameExists(todo: any) {
    if (this.toDoListFromBackend.find(x => x.title === todo))
      return true;
    return false
  }

  fetchTodos(id?: number) {
    // Async, Observable, Subscribe
    this.httpClient
      .get<GetToDoListResponse[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (response: GetToDoListResponse[]) => {
          this.toDoListFromBackend = id
            ? response.filter(todo => todo.id === id)
            : response;
        },
        error: (err: any) => {
          console.log('HATA', err);
        },
        complete: () => {
          console.log('istek başarılı bitti');
        },
      });
    // RxJs observable
  }

  removeTodo(id: number) {
    this.httpClient
      .delete<GetToDoListResponse>(`https://jsonplaceholder.typicode.com/todos/${id}`).subscribe({
        next: () => {
          this.toastr.success("ToDo başarılı bir şekilde silindi.", "Başarılı");
          this.toDoListFromBackend = this.toDoListFromBackend.filter((i) => i.id !== id);
        },
        error: (err: any) => {
          this.toastr.error("Bir hata oluştu!", "Hata");
        },
        complete: () => {
          console.log('istek başarılı bitti');
        },
      })
  }

  createToDo() {
    const trimmedInput = this.toDoRequest.title.trim();
    if (trimmedInput === "") {
      this.toastr.warning("Todo girişi boş olamaz.", "Uyarı");
      this.toDoRequest.title = ''
      return;
    }
    if (this.todoNameExists(trimmedInput)) {
      this.toastr.warning("Listede var olan todo girdiniz.", "Uyarı");
      this.toDoRequest.title = ''
      return;
    }

    this.httpClient
      .post<CreateToDoRequest>('https://jsonplaceholder.typicode.com/todos', this.toDoRequest).subscribe({
        next: (request) => {
          this.toastr.success("ToDo olusturuldu.", "Başarılı");
          this.toDoListFromBackend.push(request)
          this.toDoRequest.title = ''
        },
        error: (err: any) => {
          this.toastr.error("Bir hata oluştu!", "Hata");
        },
        complete: () => {
          console.log('istek başarılı bitti');
        }
      })
  }


}
