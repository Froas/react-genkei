import React from "react";
import { useState } from "react";
import "../../assets/css/App.css";

export const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="Counter">
      <button onClick={() => setCount(count + 1)}>+</button>
      <p className="Count">{count}</p>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
};
