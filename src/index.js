import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/App.css";
import App from "./App";

const root = document.getElementById("root");
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
