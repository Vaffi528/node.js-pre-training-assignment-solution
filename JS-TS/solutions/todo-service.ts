import { TodoApi } from './todo-api';
import { Todo } from './types';
import { filterArray } from './array-helpers';
import { TodoNotFoundError } from './todo-not-found-error';
import { TodoStatus } from './types';

export class TodoService {
  constructor(private readonly api: TodoApi) { }

  async create(title: string, description = ''): Promise<Todo> {
    this.checkIfNullOrUndifined(title, 'create');
    return await this.api.add({title: title, 
                ...(description !== '' ? {description: description} : {})});
  }

  async toggleStatus(id: number): Promise<Todo> {
    this.checkIfNullOrUndifined(id, 'toggleStatus');

    const repo = await this.api.getAll();
    const todos = filterArray(repo, todo => todo.id === id);

    if (todos.length !== 1) {
      throw new TodoNotFoundError(id);
    }

    const currentStatus = todos[0].status;

    let newStatus: TodoStatus;
    if (currentStatus === TodoStatus.PENDING) {
      newStatus = TodoStatus.IN_PROGRESS;
    } else if (currentStatus === TodoStatus.IN_PROGRESS) {
      newStatus = TodoStatus.COMPLETED;
    } else {
      newStatus = TodoStatus.PENDING;
    }

    return await this.api.update(id, {status: newStatus})
  }

  async search(keyword: string): Promise<Todo[]> {
    this.checkIfNullOrUndifined(keyword, 'search');
    const repo = await this.api.getAll();
    return filterArray(repo, todo => 
            todo.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || 
            (todo.description ?? '').toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
  }

  async checkIfNullOrUndifined(argument: (number | string), methodName: string) {
    if (argument === null || argument === undefined) {
      throw new Error(`TodoService.${methodName}: Id must be provided`);
    }
  }
}
