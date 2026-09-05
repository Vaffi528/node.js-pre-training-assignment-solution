export class TodoNotFoundError extends Error {
  constructor(id:  number) {
    if (id < 0) {
      super("Id property must be greater or equal then 0");
    } else {
      super(`There are no element with such id: ${id}`);
    }
  }
}