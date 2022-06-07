import React from "react";
import "./item.css";
import Image from "./Image";

export default function MealListItem(props) {
  const imageLoc = "meal" + props.meal.id + ".jpg";

  return (
    <div className="dish">
      <Image name={imageLoc} />
      <div className="details">
        <h3>{props.meal.title}</h3>
        <button className="click-button">
          <a href={"/meals/" + props.meal.id}> Check Out</a>
        </button>
      </div>
    </div>
  );
}
