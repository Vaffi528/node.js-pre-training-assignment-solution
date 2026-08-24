import { Todo } from './types';
import { mapArray, filterArray } from './array-helpers';

function hasTodoWithId(state: Todo[], id: number): boolean {
  const isExist = state.some((value: Todo) => value.id === id);
  return isExist
}
export function addTodo(state: Todo[], todo: Todo): Todo[] {
  let resultArray: Todo[] = [];
  resultArray.push(todo);
  return resultArray;
}

export function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo[] {
  if (!hasTodoWithId(state, id)) {
    throw new Error(`updateTodo: There are no element with such id: ${id}`)
  }

  return mapArray(state, (value: Todo) => value.id === id ? <Todo>{...value, ...update} : value);
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  if (!hasTodoWithId(state, id)) {
    throw new Error(`removeTodo: There are no element with such id: ${id}`)
  }

  return filterArray(state, (value: Todo) => value.id !== id);
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  if (!hasTodoWithId(state, id)) {
    throw new Error(`removeTodo: There are no element with such id: ${id}`)
  }

  return filterArray(state, (value: Todo) => value.id === id)[0];
}
