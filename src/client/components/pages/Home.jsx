import React from "react";
import { useEffect, useState } from "react";
import MealListContainer from "./MealListConatiner";
import "./allmeals.css";

export default function AllMeals() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allMeals, setAllMeals] = useState([]);

  useEffect(() => {
    fetch("/api/meals")
      .then((res) => res.json())
      .then(
        (data) => {
          setAllMeals(data);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (allMeals) {
    return (
      <div>
        <div className="TopMealHeader">
          <h2>Top Rated Meals</h2>
        </div>
        <div>
          <MealListContainer
            allMeals={allMeals}
            className="mealListContainer"
          />
        </div>
      </div>
    );
  }
}
