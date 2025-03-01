import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TodoContext } from ".";
import { TodoItem } from "../types";

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
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

  const [searchParams, setSearchParams] = useSearchParams();
  const filter =
    (searchParams.get("filter") as "all" | "completed" | "incomplete") || "all";
  const sortOrder = (searchParams.get("sort") as "asc" | "desc") || "asc";

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [todos]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (filter !== "all") params.filter = filter;
    if (sortOrder !== "asc") params.sort = sortOrder;
    setSearchParams(params);
  }, [filter, sortOrder, setSearchParams]);

  const addTodo = (text: string) => {
    if (text.trim() === "") return;
    const newTodo: TodoItem = {
      id: Date.now(),
      text,
      completed: false,
      date: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortOrder === "asc")
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        editTodo,
        deleteTodo,
        filter,
        setFilter: (newFilter) => {
          const params: Record<string, string> = {};
          if (newFilter !== "all") params.filter = newFilter;
          if (sortOrder !== "asc") params.sort = sortOrder;
          setSearchParams(params);
        },
        filteredTodos,
        sortOrder,
        setSortOrder: (newSort) => {
          const params: Record<string, string> = {};
          if (filter !== "all") params.filter = filter;
          if (newSort !== "asc") params.sort = newSort;
          setSearchParams(params);
        },
        sortedTodos,
        input,
        setInput,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
