import React from "react";
import { useEffect, useState } from "react";
import MealAddButton from ".././MealAddButton";
import ".././Styles/Form.css";
export default function NewMeal() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allMeals, setAllMeals] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [whenDateTime, setWhenDateTime] = useState("2022-06-06T12:57");
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
    fetch("/api/meals", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMealAddResponse(data);
      });
  };

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
      <div className="Form">
        <div className="InputForm">
          <h3 className="InputFormHeading">
            Have a new meal to share? Fill out and submit the form below and
            it's done!!{" "}
          </h3>
          <div className="InputFormItem">
            <label className="InputLabel">Title:</label>
            <input
              className="InputDiv"
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="InputFormItem">
            <label className="InputLabel">Description:</label>
            <textarea
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="InputFormItem">
            <label className="InputLabel">Location:</label>
            <input
              className="InputDiv"
              type="text"
              id="location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="InputFormItem">
            <label className="RvationsInputLabel">Max reservations:</label>
            <input
              className="InputDiv"
              type="number"
              id="maxReservations"
              min="1"
              onChange={(e) => setMaxReservations(e.target.value)}
            />
          </div>

          <div className="InputFormItem">
            <label className="InputLabel">Price:</label>
            <input
              className="InputDiv"
              type="text"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="InputFormItem">
            <label className="InputLabel">Created Date:</label>
            <input
              className="InputDiv"
              type="date"
              id="createdDate"
              onChange={(e) => setCreatedDate(e.target.value)}
            />
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
