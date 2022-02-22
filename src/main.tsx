import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App"


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
