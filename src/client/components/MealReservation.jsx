import { useParams } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import MealToReserve from "./MealToReserve";
export default function MealReservation() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mealDetails, setMealDetails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/meals")
      .then((res) => res.json())
      .then(
        (data) => {
          setMealDetails(data);
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
  if (mealDetails) {
    const mealDetailparameter = mealDetails.filter(
      (mealDetail) => parseInt(mealDetail.id) == parseInt(id)
    );
    console.log(mealDetailparameter);
    if (mealDetailparameter.length > 0) {
      console.log("in satis faction");
      return <MealToReserve mealDetailparameter={mealDetailparameter} />;
    } else {
      return <MealDetailsWithoutReservation mealId={id} />;
    }
  }
}
