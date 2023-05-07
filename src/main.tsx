import React from "react";
import ReactDOM from "react-dom/client";
import DatePicker from "./DatePicker.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DatePicker />
  </React.StrictMode>
);
