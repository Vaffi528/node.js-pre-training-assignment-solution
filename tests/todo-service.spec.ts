import { TodoService } from "../JS-TS/solutions/todo-service";
import { TodoApi } from "../JS-TS/solutions/todo-api";
import { TodoStatus } from "../JS-TS/solutions/types";

describe('TodoService tests', () => {
  const api = new TodoApi();
  const service = new TodoService(api);
  
  it('successful creation of a todo', async () => {
    const todo1 = await service.create("testTodo");
    expect(todo1.title).toBe("testTodo");
    const todo2 = await service.create("testTodo2", 'description');
    expect(todo2.title).toBe("testTodo2");
    expect(todo2.description).toBe("description");
  });

  it('toggling status', async () => {
    let todo = await service.toggleStatus(1);
    expect(todo.status).toBe(TodoStatus.IN_PROGRESS);
    todo = await service.toggleStatus(1);
    expect(todo.status).toBe(TodoStatus.COMPLETED);
    todo = await service.toggleStatus(1);
    expect(todo.status).toBe(TodoStatus.PENDING);
  });

  it('search returns matching items', async () => {
    let fitTodos = await service.search("test");
    expect(fitTodos.length).toBe(2);
    expect(fitTodos[0].title).toBe("testTodo");
    expect(fitTodos[1].title).toBe("testTodo2");
    fitTodos = await service.search("desc");
    expect(fitTodos.length).toBe(1);
    expect(fitTodos[0].description).toBe("description");
    fitTodos = await service.search("67");
    expect(fitTodos.length).toBe(0);
  });
    
  it('error is thrown when updating non-existing id', async () => {
    await expect(service.toggleStatus(67)).rejects.toThrow(/There are no element with such id: 67/);
    await expect(service.toggleStatus(-67)).rejects.toThrow(/Id property must be greater or equal then 0/);
  });
});
