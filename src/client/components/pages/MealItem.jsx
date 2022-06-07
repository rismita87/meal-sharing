import React from "react";
import "./mealitem.css";

export default function MealItem(props) {
  return (
    <div className="item">
      <h3>{props.meal.title}</h3>
      <div className="mealDetail">
        <i className="fa fa-money"></i>
        <p>{props.meal.price} dkk</p>
      </div>
      <div className="mealDetail">
        <i className="fa fa-map-marker"></i>
        <p>{props.meal.location}</p>
      </div>
      <div className="itemdetails">
        <button className="clickButton">
          <a href={"/meals/" + props.meal.id}>Book</a>
        </button>
        <button className="clickButton">
          <a href={"/meals/" + props.meal.id}>Review</a>
        </button>
      </div>
    </div>
  );
}
