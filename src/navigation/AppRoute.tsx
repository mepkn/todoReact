import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "../components/Container";
import { TodoProvider } from "../context/TodoContext";
import { NotFound } from "../pages/NotFound";
import { Todo } from "../pages/Todo";
import { TodoDelete } from "../pages/TodoDelete";
import { TodoEdit } from "../pages/TodoEdit";

export const AppRoute = () => {
  return (
    <BrowserRouter>
      <TodoProvider>
        <Routes>
          <Route path="/" element={<Container />}>
            <Route index element={<Todo />} />
            <Route path="todo/:todoId/edit" element={<TodoEdit />} />
            <Route path="todo/:todoId/delete" element={<TodoDelete />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TodoProvider>
    </BrowserRouter>
  );
};
