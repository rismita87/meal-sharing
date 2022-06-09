import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ReviewContainer.css";
export default function ReviewContainer({ meal }) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then(
        (data) => {
          setReviews(data);
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
  if (reviews) {
    const mealSpecificReviews = reviews.filter(
      (review) => review.meal_id == meal.id
    );
    console.log(mealSpecificReviews);
    let mealReview;
    let reviewCount = 3;
    mealSpecificReviews.forEach((eachReview) => {
      let starCounter = parseInt(eachReview.stars);
      let startTags;
      let unstarredTags = 5 - starCounter;

      while (starCounter > 0) {
        startTags = [
          startTags,
          <span className="fa fa-star checked" key={startTags}></span>,
        ];
        starCounter--;
      }
      while (unstarredTags > 0) {
        startTags = [
          startTags,
          <span className="fa fa-star" key={startTags}></span>,
        ];
        unstarredTags--;
      }
      if (reviewCount > 0) {
        mealReview = [
          mealReview,
          <div className="MealReview" key={eachReview.id}>
            <label>{startTags}</label>
            <p>{"'" + eachReview.description + "'"}</p>
          </div>,
        ];
        reviewCount--;
      } else reviewCount--;
    });
    if (mealSpecificReviews.length > 0) {
      return (
        <div>
          <h3>Reviews</h3>
          <div className="ReviewContainer">{mealReview}</div>
        </div>
      );
    } else {
      return <h4>No review available.</h4>;
    }
  } else {
    return <h3>failed to pick reviews</h3>;
  }
}
