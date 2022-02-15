import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Counter } from "./components/Counter/Counter";
import { Header } from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import Pokemon from "./components/Pokemon/Pokemon";
import { Blog } from "./components/Blog/Blog";
import { Button } from "./components/Button/Button";
import Card from "./components/Card/Card";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/button" element={<Button />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
