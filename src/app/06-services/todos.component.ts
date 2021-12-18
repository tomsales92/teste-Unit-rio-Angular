
import { Injectable } from '@angular/core';
import { TodoService } from './todo.service'

@Injectable()
export class TodosComponent {
  todos: any[] = [];
  message: any;

  constructor(private service: TodoService) {}

  ngOnInit() {
    this.service.getTodos().subscribe(t => this.todos = t);
  }

  add() {
    var newTodo = { title: '... ' };
    this.service.add(newTodo).subscribe(
      t => this.todos.push(t),
      err => this.message = err);
  }

  delete(id: any) {
    if (confirm('Are you sure?'))
      this.service.delete(id).subscribe();
  }
}
