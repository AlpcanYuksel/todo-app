import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  constructor(private toastr: ToastrService) { }

  todoList: string[] = [];
  input: string = "";


  handleSubmit() {
    const trimmedInput = this.input.trim();

    if (trimmedInput === "") {
      this.toastr.warning("Todo girişi boş olamaz.", "Uyarı");
      return;
    }

    if (this.todoNameExists(trimmedInput)) {
      this.toastr.warning("Listede var olan todo girdiniz.", "Uyarı");
      return;
    }
    this.todoList.push(trimmedInput);
    this.input = "";
  }

  removeTodo(index: number) {
    this.todoList.splice(index, 1);
  }
  todoNameExists(todo: string) {
    return this.todoList.includes(todo)
  }

}
