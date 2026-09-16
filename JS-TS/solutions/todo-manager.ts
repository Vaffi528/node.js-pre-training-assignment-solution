import { TodoService } from './todo-service';
import { TodoApi } from './todo-api';
import { Todo } from './types';

export class ToDoManager {
  private api = new TodoApi()
  private service = new TodoService(this.api);
  private isInit = false;

  async init(): Promise<void> {
    if (this.isInit) {
      return;
    }

    await this.service.create("Todo1", "descr");
    await this.service.create("Todo2", "67");
    await this.service.create("Todo3");
    await this.service.create("Todo4");
    await this.service.create("Todo5", "42");
  }

  async add(title: string, description = ''): Promise<void> {
    await this.service.create(title, description);
  }

  async complete(id: number): Promise<void> {
    await this.service.toggleStatus(id);
  }

  async list(): Promise<Todo[]> {
    return await this.api.getAll();
  }
}
