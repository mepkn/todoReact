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
      <details style={{ marginTop: "20px" }}>
        <summary>⚒️</summary>
        <ul>
          <TodoFilter />
          <TodoSort />
        </ul>
      </details>
      <TodoList />
    </>
  );
};
