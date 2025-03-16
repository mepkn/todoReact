import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocTitle";
import { useTodoContext } from "../hooks/useTodoContext";

export const TodoEdit = () => {
  useDocumentTitle("Edit Todo");
  const navigate = useNavigate();
  const { todoId } = useParams<{ todoId: string }>();
  const { todos, editTodo } = useTodoContext();

  const currentTodo = todos.find((t) => t.id === Number(todoId));

  const [editText, setEditText] = useState(currentTodo ? currentTodo.text : '');

  useEffect(() => {
    if (!currentTodo) {
      navigate("/");
    }
  }, [currentTodo, navigate]);

  const handleEdit = () => {
    if (currentTodo && editText.trim() !== '') {
      editTodo(currentTodo.id, editText);
      navigate("/");
    }
  };

  if (!currentTodo) {
    return <div>Todo not found</div>;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Edit Todo</h1>
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
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={{ flexGrow: 1, marginBottom: 0 }}
        />
        <button className="pico-background-jade-500" onClick={handleEdit}>
          Save
        </button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </div>
    </>
  );
};
