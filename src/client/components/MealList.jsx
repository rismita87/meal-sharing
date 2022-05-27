import MealItem from "./MealItem";
import React from "react";
import "./Styles/mealList.css";
export default function MealList(props) {
  const meals = props.allMeals.map((meal) => (
    <MealItem meal={meal} key={meal.id} />
  ));
  meals.forEach((element) => {});
  return (
    <div className="mealList">
      <h1 className="h1">Meal List</h1>
      <table cellPadding="10%">
        <thead className="tableHead">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Price</th>
            <th>Go To</th>
          </tr>
        </thead>
        <tbody className="tableBody" key={meals}>
          {meals}
        </tbody>
      </table>
    </div>
  );
}
