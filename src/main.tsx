import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoute } from "./navigation/AppRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoute />
  </StrictMode>
);
