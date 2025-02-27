import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TodoSingle } from "./TodoSingle.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoSingle />
  </StrictMode>
);
