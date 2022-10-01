import { Component, OnInit } from '@angular/core';
import { Filter } from './models/filter.model';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo-app';
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  editedTodo: Todo | null = null;

  ngOnInit() {
    this.todos = this.localTodos;
    this.filteredTodos = this.todos;
  }

  get localTodos() {
    const todos = localStorage.getItem('todos');
    if (todos === null) {
      localStorage.setItem('todos', JSON.stringify([]));
      return [];
    } else {
      return JSON.parse(todos) as Todo[];
    }
  }

  set localTodos(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addTodo(todo: Todo, edit: boolean) {
    if (!edit) this.todos.unshift(todo);
    else {
      this.todos = this.todos.map((currentTodo) => {
        if (currentTodo.id === this.editedTodo?.id) {
          return todo;
        }

        return currentTodo;
      });
      this.editedTodo = null;
    }
    this.onFilter('all');
    this.localTodos = this.todos;
  }

  completeTodo(id: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    this.onFilter('all');
    this.localTodos = this.todos;
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.localTodos = this.todos;
    this.onFilter('all');
  }

  editTodo(todo: Todo) {
    this.editedTodo = todo;
  }

  onFilter(filter: Filter) {
    switch (filter) {
      case 'all':
        this.filteredTodos = this.todos;
        break;

      case 'completed':
        this.filteredTodos = this.todos.filter((todo) => todo.completed);
        break;

      case 'uncompleted':
        this.filteredTodos = this.todos.filter((todo) => !todo.completed);
    }
  }
}
