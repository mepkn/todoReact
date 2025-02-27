import { TodoListProps } from "../types";
import { TodoItem } from "./TodoItem";

export const TodoList = ({
  todos,
  editingId,
  editText,
  enterEditMode,
  setEditText,
  saveEdit,
  toggleTodo,
  deleteTodo,
}: TodoListProps) => {
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
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editingId={editingId}
          editText={editText}
          enterEditMode={enterEditMode}
          setEditText={setEditText}
          saveEdit={saveEdit}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};
