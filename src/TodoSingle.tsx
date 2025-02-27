import { useEffect, useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  date: string;
};

export const TodoSingle = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
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
    const newTodo: Todo = {
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo"
          style={{ marginBottom: "0px" }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <details style={{ marginTop: "20px" }}>
        <summary>⚒️</summary>
        <ul>
          {/* Filter */}
          <div style={{ marginTop: "20px" }}>
            <label>
              Filter:
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(
                    e.target.value as "all" | "completed" | "incomplete"
                  )
                }
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </label>
          </div>
          {/* Sort */}
          <div>
            <label>
              Sort by Date:
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>
        </ul>
      </details>
      {/* Todos */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {sortedTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              style={{ flexShrink: 0 }}
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {editingId === todo.id ? (
              // Input and Save
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flexGrow: 1, marginBottom: "0px" }}
                />
                <button
                  className="pico-background-jade-500"
                  onClick={() => saveEdit(todo.id)}
                >
                  Save
                </button>
              </>
            ) : (
              // Text and Edit
              <>
                <span
                  style={{
                    flexGrow: 1,
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
                <button
                  className="pico-background-jade-500"
                  onClick={() => enterEditMode(todo.id, todo.text)}
                >
                  Edit
                </button>
              </>
            )}
            {/* Delete */}
            <button
              className="pico-background-red-500"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
