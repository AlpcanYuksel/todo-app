import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  @Input() toDoFromOtherPage: string = '';
  @Input() toDoId!: number;
  @Output() onRemoveClick: EventEmitter<number> = new EventEmitter<number>();

  onRemove() {
    this.onRemoveClick.emit(this.toDoId);
  }

}
