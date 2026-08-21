import { Todo, NewTodo, TodoStatus } from './types';

let nextId = 1;

export function createTodo(input: NewTodo): Todo {
  let resultInterface: Todo = {
    id: nextId,
    title: input.title,
    status: TodoStatus.PENDING,
    createdAt: new Date()
  };

  if (input.description !== undefined) {
    resultInterface.description = input.description;
  }

  ++nextId;
  
  return resultInterface;
}
