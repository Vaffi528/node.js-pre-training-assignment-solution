interface Todo {
    id: number;
    title: string;
    description?: string;
    status: TodoStatus;
    readonly createdAt: Date;
}

enum TodoStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED,
}

type NewTodo = Omit<Todo, 'id'|'createdAt'|'status'>;

export { Todo, TodoStatus, NewTodo };