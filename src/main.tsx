import React from "react";
import ReactDOM from "react-dom/client";
import DatePicker from "./DatePicker.tsx";
import "./index.scss";
import LocaleContextComponent from "./LocaleContextComponent.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocaleContextComponent>
      <DatePicker />
    </LocaleContextComponent>
  </React.StrictMode>
);
