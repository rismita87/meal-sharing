import React from "react";
import "./Styles/button.css";
export default function ReserveButton(param) {
  return (
    <button
      className="button"
      onClick={() => {
        console.log("in butoon" + param.name);
        param.reserveButtonAction();
      }}
    >
      Reserve
    </button>
  );
}
