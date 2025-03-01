export type TodoContextType = {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  deleteTodo: (id: number) => void;
  filter: "all" | "completed" | "incomplete";
  setFilter: (filter: "all" | "completed" | "incomplete") => void;
  filteredTodos: TodoItem[];
  sortOrder: "asc" | "desc";
  setSortOrder: (sortOrder: "asc" | "desc") => void;
  sortedTodos: TodoItem[];
  input: string;
  setInput: (text: string) => void;
};

export type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
  date: string;
};
