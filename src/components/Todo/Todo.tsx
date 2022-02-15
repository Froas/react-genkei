import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [todoItems, setTodoItems] = useState<[string, string][]>([]);
  return (
    <div className="ToDo-Header">
      <h1>To Do</h1>
      <input
        placeholder="type title"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
      />
      <input
        placeholder="type text"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setText(e.currentTarget.value)
        }
      />
      <button onClick={() => setTodoItems(todoItems.concat([[text, title]]))}>
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
