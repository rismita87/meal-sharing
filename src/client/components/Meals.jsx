import React from "react";
import MealList from "./MealList";
import { useEffect, useState } from "react";
import MealAddButton from "./MealAddButton";
import "./Styles/Meals.css";
export default function Meals() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allMeals, setAllMeals] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [whenDateTime, setWhenDateTime] = useState();
  const [maxReservations, setMaxReservations] = useState();
  const [price, setPrice] = useState();
  const [createDate, setCreatedDate] = useState();
  const [mealAddResponse, setMealAddResponse] = useState();

  const mealAddAction = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: allMeals.length + 1,
        title: title,
        description: description,
        location: location,
        when: whenDateTime,
        max_reservations: maxReservations,
        price: price,
        created_date: createDate,
      }),
    };
    fetch("http://localhost:5000/api/meals", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMealAddResponse(data);
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/meals")
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
        <MealList allMeals={allMeals} />
        <div className="InputWholeForm">
          <div className="inputSet1">
            <h3>Add Meal</h3>
            <label className="titleInputLabel">
              Title{" "}
              <input
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="descriptionInputLabel">
              Description{" "}
              <input
                type="text"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="locationInputLabel">
              Location{" "}
              <input
                type="text"
                id="location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <label className="whenDateTime">
              When{" "}
              <input
                type="datetime-local"
                id="dateTime"
                onChange={(e) => setWhenDateTime(e.target.value)}
              />
            </label>
          </div>
          <div className="inputSet2">
            <label className="maxreseRvationsInputLabel">
              Max reservations{" "}
              <input
                type="number"
                id="maxReservations"
                min="1"
                onChange={(e) => setMaxReservations(e.target.value)}
              />
            </label>

            <label className="priceInputLabel">
              Price{" "}
              <input
                type="text"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            <label className="createdDate">
              Created Date{" "}
              <input
                type="date"
                id="createdDate"
                onChange={(e) => setCreatedDate(e.target.value)}
              />
            </label>
          </div>
          <div className="mealAddButton">
            <MealAddButton
              mealButtonAction={mealAddAction}
              name={allMeals.length + 1}
            />
          </div>
        </div>
        <div className="MealAddResponse">{mealAddResponse}</div>
      </div>
    );
  }
}
