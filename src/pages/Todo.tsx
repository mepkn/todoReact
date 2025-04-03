import { TodoFilter } from "../components/TodoFilter";
import { TodoInput } from "../components/TodoInput";
import { TodoList } from "../components/TodoList";
import { TodoSort } from "../components/TodoSort";
import { useDocumentTitle } from "../hooks/useDocTitle";

export const Todo = () => {
  useDocumentTitle("Todo");

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      <TodoInput />
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <TodoFilter />
        <TodoSort />
      </div>
      <TodoList />
    </>
  );
};
