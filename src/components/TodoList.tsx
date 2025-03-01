import { useNavigate } from "react-router-dom";
import { useTodoContext } from "../hooks/useTodoContext";

export const TodoList = () => {
  const navigate = useNavigate();
  const { sortedTodos, toggleTodo } = useTodoContext();

  return (
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
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            style={{ flexShrink: 0 }}
          />
          <span
            style={{
              flexGrow: 1,
              textDecoration: todo.completed ? "line-through" : "none",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {todo.text}
          </span>
          <button
            className="pico-background-jade-500"
            onClick={() => navigate(`/todo/${todo.id}/edit`)}
          >
            Edit
          </button>
          <button
            className="pico-background-red-500"
            onClick={() => navigate(`/todo/${todo.id}/delete`)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
