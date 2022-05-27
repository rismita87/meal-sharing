import React, { useState, useEffect } from "react";
import "./Styles/mealReseve.css";
import ReserveButton from "./ReserveButton";
export default function MealList(props) {
  const meal = props.mealDetailparameter;
  let reservationDivClass = "reservation";
  let showSorryDiv = "";
  console.log("====" + meal[0].id);
  const availableReservation =
    meal[0].max_reservations - meal[0].reservationCount;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allReservations, setAllReservations] = useState([]);
  const [guestCount, setGuestCount] = useState(0);
  const [dateTime, setDateTime] = useState();
  const [email, setEmail] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [name, setName] = useState();
  const [reservationUpdateResponse, setReservationUpdateResponse] = useState();
  setName;
  const reserveMealAction = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: allReservations.length + 1,
        number_of_guests: guestCount,
        meal_id: meal[0].id,
        created_date: dateTime,
        contact_phonenumber: mobileNo,
        contact_name: name,
        contact_email: email,
      }),
    };
    fetch("http://localhost:5000/api/reservations", requestOptions)
      .then((response) => response.json())
      .then((data) => setReservationUpdateResponse(data));
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/reservations")
      .then((res) => res.json())
      .then(
        (data) => {
          setAllReservations(data);
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
  if (allReservations) {
    console.log(allReservations.length);
  }
  if (availableReservation == 0) {
    reservationDivClass = "reservationDivInvisible";
  } else {
    showSorryDiv = "sorryDivInvisible";
  }
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
      <div className={showSorryDiv}>
        <h1>No Reservation Available</h1>
      </div>
      <div className={reservationDivClass}>
        <h3>Reserve Meal</h3>

        <div className="inputDiv1">
          <label className="nameInputLabel">
            Name{" "}
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="mobileInputLabel">
            Mobile Number{" "}
            <input
              type="text"
              id="mobileNo"
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </label>

          <label className="emailInputLabel">
            Email{" "}
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="dateTime">
            Time{" "}
            <input
              type="datetime-local"
              id="dateTime"
              onChange={(e) => setDateTime(e.target.value)}
            />
          </label>
        </div>
        <div className="inputDiv3">
          <label>Number of Guests </label>
          <select
            name="guestCount"
            id="guestCount"
            onChange={(e) => setGuestCount(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        <div className="mealReserveButtonDiv">
          <ReserveButton reserveButtonAction={reserveMealAction} name={name} />
        </div>
      </div>
    </div>
  );
}
