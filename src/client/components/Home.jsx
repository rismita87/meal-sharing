import React from "react";
import MealList from "./MealList";
import { useEffect, useState } from "react";
export default function Home() {
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
    return <MealList allMeals={allMeals} />;
  }
}
