import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BookMeal.css";
import BookMealForm from "./BookMealForm";
import ReviewContainer from "./ReviewContainer";
import AddReview from "./AddReview";
export default function BookMeal() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("/api/meals")
      .then((res) => res.json())
      .then(
        (data) => {
          setMeals(data);
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
  if (meals) {
    const mealDetail = meals.filter((meal) => meal.id == id);
    const availableReservation =
      mealDetail[0].max_reservations - mealDetail[0].reservationCount;

    return (
      <div className="MealDetailsWhole">
        <div className="MealBox">
          <div className="image">
            <img src="https://via.placeholder.com/320x400" />
          </div>
          <div>
            <div className="title">
              <h2>{mealDetail[0].title}</h2>
            </div>
            <div className="description">
              <p>{mealDetail[0].description}</p>
            </div>
            <div className="price">
              <p>Price: {mealDetail[0].price} dkk</p>
            </div>
            <div className="location">
              <p>Location: {mealDetail[0].location}</p>
            </div>
            <div className="availableReservation">
              <p>No. of available reservations: {availableReservation}</p>
            </div>
            <div className="topReviewContainser">
              <ReviewContainer meal={mealDetail[0]} />
            </div>
          </div>
        </div>
        <div className="inputInMeal">
          <div className="BookFormInput">
            <BookMealForm meal={mealDetail[0]} />
          </div>
          <div className="ReviewFormInput">
            <AddReview meal={mealDetail[0]} />
          </div>
        </div>
      </div>
    );
  }
}
