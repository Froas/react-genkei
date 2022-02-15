import "../../assets/css/Button.scss";
import { useState } from "react";

export const Button = () => {
  const [cloneButton, setCloneButton] = useState<number[]>([1]);
  console.log(cloneButton);
  return (
    <div className="ExpandableButtonContainer">
      {cloneButton.map((e) => (
        <div
          className="ExpandableButton"
          onClick={() => setCloneButton(cloneButton.concat(1))}
        >
          Click
        </div>
      ))}
    </div>
  );
};
