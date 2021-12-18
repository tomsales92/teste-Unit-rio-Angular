import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { from, of, throwError } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) })
    service = new TodoService(spy);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server  ', () => {
    let todos = [1, 2, 3];
    spyOn(service, 'getTodos').and.callFake(() => {
      return from([todos]);
    });
    component.ngOnInit();
    expect(component.todos).toBe(todos);
  });

  it('should call the server to save the changes when a new todo item is added', ()=> {
    let spy = spyOn(service, 'add').and.callFake(t => {
      return of();
    });
    component.add();
    expect(spy).toHaveBeenCalled();
  })

  it('should call the server to save the changes when a new todo item is added', ()=> {
    let spy = spyOn(service, 'add').and.callFake(t => {
      return of();
    });
    component.add();
    expect(spy).toHaveBeenCalled();
  })

  it('should add the new todo returned from the server', ()=> {
    let newTodo = {id: 1};

    spyOn(service, 'add').and.returnValue(from([newTodo]));
    component.add();
    expect(component.todos.indexOf(newTodo)).toBeGreaterThan(-1);
  })

  it('should set the message property if server return an error when adding a new todo', ()=> {
    let errormessage = 'error the serve'

    spyOn(service, 'add').and.returnValue(throwError(errormessage));
    component.add();
    expect(component.message).toBe(errormessage);
  })

  it('should call the server to delete a todo item if the user confirms', ()=>{
      spyOn(window, 'confirm').and.returnValue(true);
      let spy = spyOn(service, 'delete').and.returnValue(of());

      component.delete(1);

      expect(spy).toHaveBeenCalledWith(1);
  })

  it('should NOT call the server to delete a todo item if the user cancels', ()=>{
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(of());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
})
});
