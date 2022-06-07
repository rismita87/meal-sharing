import React from "react";
import "./allmeals.css";

export default function Search({ allMeals, filterMealArrayAction }) {
  return (
    <div>
      Search{" "}
      <input
        type="text"
        className="searchInputDiv"
        onChange={(e) => filterMealArrayAction(e.target.value)}
      />
    </div>
  );
}
