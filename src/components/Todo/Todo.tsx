import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { use } from "../../utils"
import { setTitle, setText, selectPgSlice, addTodoItem } from "../ReduxPG/reduxPgSlice"

type TodoItem = {
  title: string;
  text: string;
};

const MkTodo: React.FC<TodoItem> = (props): JSX.Element => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.text}</p>
    </div>
  );
};

const Todo: React.FC = () => {
  const reduxData = use(selectPgSlice)
  const dispatch = useDispatch()
  const todoItems = reduxData.todoItems

 
  return (
    <div className="ToDo-Header">
      <h1>To Do</h1>
      <input
        placeholder="type title"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          dispatch(setTitle(e.currentTarget.value))
        }
      />
      <input
        placeholder="type text"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          dispatch(setText(e.currentTarget.value))
        }
      />
      <button onClick={() => dispatch(addTodoItem([reduxData.title, reduxData.text]))}>
        {" "}
        Create a porst{" "}
      </button>
      {todoItems.length > 0 ? (
        todoItems.map(([k, v]) => <MkTodo key={uuidv4()} title={k} text={v} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default Todo;
