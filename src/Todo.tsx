import { useEffect, useState } from "react";
import { TodoFilter } from "./components/TodoFilter";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TOdoList";
import { TodoSort } from "./components/TodoSort";
import { TodoItem } from "./types";

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
      return [];
    }
  });
  const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [todos]);

  // Add a new todo
  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo: TodoItem = {
      id: Date.now(),
      text: input,
      completed: false,
      date: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  // Toggle todo completion status
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Enter edit mode for a todo
  const enterEditMode = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  // Save edited todo
  const saveEdit = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditingId(null);
    setEditText("");
  };

  // Filter todos based on completion status
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  // Sort todos by date
  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortOrder === "asc")
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="container" style={{ paddingBlock: "20px" }}>
      {/* Title */}
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      {/* Input */}
      <TodoInput input={input} setInput={setInput} addTodo={addTodo} />
      {/* Filter and Sort */}
      <details style={{ marginTop: "20px" }}>
        <summary>⚒️</summary>
        <ul>
          <TodoFilter filter={filter} setFilter={setFilter} />
          <TodoSort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </ul>
      </details>
      {/* Todo List */}
      <TodoList
        todos={sortedTodos}
        editingId={editingId}
        editText={editText}
        enterEditMode={enterEditMode}
        setEditText={setEditText}
        saveEdit={saveEdit}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};
