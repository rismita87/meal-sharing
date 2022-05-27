import React from "react";
import "./Styles/button.css";
export default function MealAddButton(param) {
  return (
    <button
      className="button"
      onClick={() => {
        console.log("in butoon" + param.name);
        param.mealButtonAction();
      }}
    >
      Add Meal
    </button>
  );
}
