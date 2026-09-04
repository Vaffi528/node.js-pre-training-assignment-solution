import { InMemoryRepository } from './repository';
import { Todo, NewTodo } from './types';
import { createTodo } from './todo-factory'
import { mapArray, filterArray } from './array-helpers'

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();
  private todos: Todo[] = [];

  async getAll(): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {resolve(this.todos);}, 300 + Math.random() * 300);
    });
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.todos.push(createTodo(newTodo));
        resolve(this.todos[this.todos.length-1])
      }, 300 + Math.random() * 300);
    });
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
   return new Promise(((resolve, reject) => {
    setTimeout(() => {
      if (!filterArray(this.todos, todo => todo.id === id)){
        reject(new TodoNotFoundError(id));
      }

      this.todos = mapArray(this.todos, (todo) => {
        return (todo.id === id ? {id: todo.id, ...update, createdAt: todo.createdAt} : todo) as Todo;
      });

      resolve(filterArray(this.todos, (todo) => todo.id === id)[0]);
    }, 300 + Math.random() * 300);
   }));
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!filterArray(this.todos, todo => todo.id === id)){
          reject(new TodoNotFoundError(id));
        }

        this.todos = filterArray(this.todos, todo => todo.id !== id);
        resolve();

      }, 300 + Math.random() * 300);
    });
  }
}

class TodoNotFoundError extends Error {
  constructor(id:  number) {
    if (id < 0) {
      super("Id property must be greater or equal then 0");
    } else {
      super(`There are no element with such id: ${id}`);
    }
  }
}