import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocTitle";
import { useTodoContext } from "../hooks/useTodoContext";

export const TodoDelete = () => {
  useDocumentTitle("Delete Todo");
  const navigate = useNavigate();
  const { todoId } = useParams<{ todoId: string }>();
  const { todos, deleteTodo } = useTodoContext();

  const todo = todos.find((t) => t.id === Number(todoId));

  useEffect(() => {
    if (!todo) {
      navigate("/");
    }
  }, [todo, navigate]);

  const handleDelete = () => {
    if (todo) {
      deleteTodo(todo.id);
      navigate("/");
    }
  };

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Delete Todo</h1>
      <p style={{ textAlign: "center" }}>
        Are you sure you want to delete the following todo?
      </p>
      <p style={{ textAlign: "center" }}>
        <strong>{todo.text}</strong>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button className="pico-background-red-500" onClick={handleDelete}>
          Delete
        </button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </div>
    </>
  );
};
