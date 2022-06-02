import "./Styles/mealReseve.css";
import React, { useState, useEffect } from "react";
export default function MealDetailsWithoutReservation(params) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mealDetails, setMealDetails] = useState([]);

  useEffect(() => {
    fetch("/api/meals/" + params.id)
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
    return (
      <div className="mealList">
        <h1 className="h1">Meal Details</h1>
        <table cellPadding="10%">
          <thead className="tableHead">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Price</th>
              <th>Available Reservation</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            <tr>
              <td>{meal[0].title}</td>
              <td>{meal[0].description}</td>
              <td>{meal[0].location}</td>
              <td>{meal[0].price}</td>
              <td>{availableReservation}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
