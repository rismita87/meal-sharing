import React from "react";
import { useEffect, useState } from "react";
import MealMenuContainer from "./MealMenuContainer";
import Search from "./Search";
import "./allmeals.css";

export default function MealMenu() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allMeals, setAllMeals] = useState([]);
  const [mealsToview, setmealsToview] = useState([]);

  useEffect(() => {
    fetch("/api/meals")
      .then((res) => res.json())
      .then(
        (data) => {
          setAllMeals(data);
          setmealsToview(data);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const filterMealArray = (text) => {
    if (text.length > 0) {
      console.log(text);
      const filteredMeal = allMeals.filter((mealtomap) =>
        mealtomap.title.toLowerCase().includes(text.toLowerCase())
      );
      console.log(filteredMeal);
      setmealsToview(filteredMeal);
    } else {
      setmealsToview(allMeals);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (allMeals) {
    return (
      <div>
        <div>
          <div className="SearchParent">
            <Search
              allMeals={allMeals}
              filterMealArrayAction={filterMealArray}
            />
          </div>
        </div>
        <div>
          <MealMenuContainer
            allMeals={mealsToview}
            className="mealMenuContainer"
          />
        </div>
      </div>
    );
  }
}
