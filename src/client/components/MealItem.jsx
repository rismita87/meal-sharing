import React from "react";
import { Link } from "react-router-dom";
import "./Styles/mealList.css";
export default function MealItem(props) {
  return (
    <tr>
      <td>{props.meal.title}</td>
      <td>{props.meal.description}</td>
      <td>{props.meal.location}</td>
      <td>{props.meal.price}</td>
      <td>
        <Link className="link" to={"/meals/" + props.meal.id}>
          Details & Reserve
        </Link>
      </td>
    </tr>
  );
}
