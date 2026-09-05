import { InMemoryRepository } from './repository';
import { Todo, NewTodo } from './types';
import { createTodo } from './todo-factory'
import { TodoNotFoundError } from './todo-not-found-error';

export class TodoApi {
  private repo = new InMemoryRepository<Todo>();

  async getAll(): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {resolve(this.repo.findAll());}, 300 + Math.random() * 300);
    });
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.repo.add(createTodo(newTodo)));
      }, 300 + Math.random() * 300);
    });
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
   return new Promise(((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(this.repo.update(id, update));
      } catch {
        reject(new TodoNotFoundError(id)); 
      }
    }, 300 + Math.random() * 300);
   }));
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
        resolve(this.repo.remove(id));
        } catch {
          reject(new TodoNotFoundError(id)); 
        }
      }, 300 + Math.random() * 300);
    });
  }
}