import React from "react";
import "./meallist.css";
import MealItem from "./MealItem";

export default function MealMenuContainer(props) {
  const meals = props.allMeals.map((meal) => (
    <MealItem meal={meal} key={meal.id} />
  ));

  return <div className="items">{meals}</div>;
}
