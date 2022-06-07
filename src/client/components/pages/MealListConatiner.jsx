import React from "react";
import "./meallist.css";
import MealListItem from "./MealListItem";

export default function MealListContainer(props) {
  const meals = props.allMeals.map((meal) => (
    <MealListItem meal={meal} key={meal.id} />
  ));

  return <div className="dishes">{meals}</div>;
}
