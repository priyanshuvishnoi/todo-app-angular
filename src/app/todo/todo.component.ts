import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo!: Todo
  @Output() completeEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit(): void {
  }

  onComplete() {
    this.completeEvent.emit(this.todo.id);
  }

  onDelete() {
    this.deleteEvent.emit(this.todo.id)
  }

  onEdit() {
    this.editEvent.emit(this.todo);
  }
}
