import { TodoInputProps } from "../types";

export const TodoInput = ({ input, setInput, addTodo }: TodoInputProps) => {
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
      <button onClick={addTodo}>Add</button>
    </div>
  );
};
