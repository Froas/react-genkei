import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../assets/css/App.css";

export const Header = () => {
  return (
    <nav className="Header">
      <Link to="/">Home</Link>
      <Link to="/counter">Counter</Link>
      <Link to="/todo">To Do</Link>
      <Link to="/pokemon">Pokemon</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/button">Button</Link>
      <Link to="/card">Card</Link>
      <Link to="/redux-pg">Redux pg</Link>
      <Outlet/>
    </nav>
  );
};
