import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  template: `<div class="todo-container">
    <ul class="todo-list">
      <app-todo
        [todo]="todo"
        *ngFor="let todo of todos"
        (completeEvent)="todoComplete($event)"
        (deleteEvent)="todoDelete($event)"
        (editEvent)="todoEdit($event)"
      ></app-todo>
    </ul>
  </div> `,
  // templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[] = [];
  @Output() todoCompleted = new EventEmitter<string>();
  @Output() todoDeleted = new EventEmitter<string>();
  @Output() todoEdited = new EventEmitter<Todo>();

  constructor() {}

  ngOnInit(): void {}

  todoComplete(id: string) {
    this.todoCompleted.emit(id);
  }

  todoDelete(id: string) {
    this.todoDeleted.emit(id);
  }

  todoEdit(todo: Todo) {
    this.todoEdited.emit(todo);
  }
}
