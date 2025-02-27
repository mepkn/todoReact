import { TodoItemProps } from "../types";

export const TodoItem = ({
  todo,
  editingId,
  editText,
  enterEditMode,
  setEditText,
  saveEdit,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) => {
  return (
    <li
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
  );
};
