import { Todo } from './types';

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

  return state.map((value: Todo) => value.id === id ? <Todo>{...value, ...update} : value);
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  if (!hasTodoWithId(state, id)) {
    throw new Error(`removeTodo: There are no element with such id: ${id}`)
  }

  return state.filter((value: Todo) => value.id !== id);
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  if (!hasTodoWithId(state, id)) {
    throw new Error(`removeTodo: There are no element with such id: ${id}`)
  }

  return state.find((value: Todo) => value.id === id);
}
