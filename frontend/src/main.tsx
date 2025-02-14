import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </StrictMode>
  );
} else {
  console.error("Root element not found. Ensure index.html has a <div id='root'></div>");
}
