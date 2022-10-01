import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Filter } from '../models/filter.model';
import { Todo } from '../models/todo.model';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  inputText: string = '';
  filter: Filter = 'all';
  @Input() todo?: Todo | null = null;
  @Output() addTodoEvent = new EventEmitter<Todo>();
  @Output() editTodoEvent = new EventEmitter<Todo>();
  @Output() filterTodoEvent = new EventEmitter<Filter>();
  @ViewChild('input', { read: ElementRef, static: true })
  inputElement?: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {
    this.inputElement?.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.todo) {
      this.inputText = this.todo.text;
      this.inputElement?.nativeElement.focus();
    }
  }

  onFilter() {
    this.filterTodoEvent.emit(this.filter);
  }

  onSubmit() {
    this.filter = 'all'
    if (!this.todo) {
      this.addTodoEvent.emit({
        id: Date.now().toString(),
        completed: false,
        text: this.inputText,
      });
    } else {
      this.editTodoEvent.emit({
        ...this.todo,
        text: this.inputText,
      });
    }
    this.inputText = '';
  }
}
