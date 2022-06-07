import React from "react";
import { useEffect, useState } from "react";
import AddReviewButton from "./AddReviewButton";
import ".././Styles/Form.css";

export default function AddReview({ meal }) {
  const [comment, setComment] = useState();
  const [dateTime, setDateTime] = useState();
  const [rating, setRating] = useState();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  let reviewCount = 0;
  const [reviewUpdateResponse, setReviewUpdateResponse] = useState();

  const addReviewAction = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: reviewCount,
        title: meal.title,
        description: comment,
        meal_id: meal.id,
        stars: rating,
        created_date: dateTime,
      }),
    };
    fetch("/api/reviews", requestOptions)
      .then((response) => response.json())
      .then((data) => setReviewUpdateResponse(data));
  };

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
    console.log("reviewCount--before" + reviews.length);
    reviewCount = reviews.length + 1;
    console.log("reviewCount" + reviewCount);

    return (
      <div className="addReviewForm">
        <div className="InputForm">
          <h3 className="InputFormHeading">Add Review</h3>
          <div className="InputFormItem">
            <label className="InputLabel">Comment</label>{" "}
            <textarea
              className="InputDiv"
              type="text"
              id="name"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="InputFormItem">
            <label className="InputLabel">Date</label>{" "}
            <input
              className="InputDiv"
              type="date"
              id="dateTime"
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div className="InputFormItem">
            <label className="InputLabel">Rating</label>{" "}
            <select id="rating" onChange={(e) => setRating(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="reviewAddButton">
            <AddReviewButton reviewButtonAction={addReviewAction} />
            <div>
              <h5>{reviewUpdateResponse}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h3>Sorry...No review available for {meal.title}</h3>;
  }
}
