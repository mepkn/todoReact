export type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
  date: string;
};

export type TodoInputProps = {
  input: string;
  setInput: (text: string) => void;
  addTodo: () => void;
};

export type TodoFilterProps = {
  filter: "all" | "completed" | "incomplete";
  setFilter: (filter: "all" | "completed" | "incomplete") => void;
};

export type TodoSortProps = {
  sortOrder: "asc" | "desc";
  setSortOrder: (sortOrder: "asc" | "desc") => void;
};

export type TodoListProps = {
  todos: TodoItem[];
  editingId: number | null;
  editText: string;
  enterEditMode: (id: number, text: string) => void;
  setEditText: (text: string) => void;
  saveEdit: (id: number) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export type TodoItemProps = {
  todo: TodoItem;
  editingId: number | null;
  editText: string;
  enterEditMode: (id: number, text: string) => void;
  setEditText: (text: string) => void;
  saveEdit: (id: number) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};
