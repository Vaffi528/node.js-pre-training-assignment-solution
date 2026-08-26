import { Todo, TodoStatus } from './types';
import { mapArray, filterArray, reduceArray} from './array-helpers'

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  return mapArray(state, item => {
    return {...item, status: completed ? TodoStatus.COMPLETED : TodoStatus.PENDING};
  });
}

export function clearCompleted(state: Todo[]): Todo[] {
  return filterArray(state, item => {
    return item.status !== TodoStatus.COMPLETED;
  });
}

export function countByStatus(state: Todo[], status: TodoStatus): number {
  return reduceArray(state, (result, item) => {
    return item.status === status ? ++result : result
  }, 0);
}
