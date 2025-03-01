import { useTodoContext } from "../hooks/useTodoContext";

export const TodoInput = () => {
  const { input, setInput, addTodo } = useTodoContext();

  const handleAddTodo = () => {
    addTodo(input);
    setInput("");
  };

  return (
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
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};
