import React from "react";
import "./item.css";
//import mealimg from "../resource/meal1.jpg";
import Image from "./Image";

export default function MealListItem(props) {
  const imageLoc = "meal" + props.meal.id + ".jpg";
  console.log(imageLoc);
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
