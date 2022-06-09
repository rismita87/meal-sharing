import ".././Styles/Form.css";
import React, { useState, useEffect } from "react";
import ReserveButton from "./ReserveButton";
export default function BookMealForm({ meal }) {
  const [guestCount, setGuestCount] = useState(0);
  const [dateTime, setDateTime] = useState();
  const [email, setEmail] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allReservations, setAllReservations] = useState([]);
  const [reservationUpdateResponse, setReservationUpdateResponse] = useState(
    []
  );

  const reserveMealAction = () => {
    const newReserveId = allReservations.length + 1;
    console.log(newReserveId);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: allReservations.length + 1,
        number_of_guests: guestCount,
        meal_id: meal.id,
        created_date: dateTime,
        contact_phonenumber: mobileNo,
        contact_name: name,
        contact_email: email,
      }),
    };
    fetch("/api/reservations", requestOptions)
      .then((response) => response.json())
      .then((data) => setReservationUpdateResponse(data));
  };
  useEffect(() => {
    fetch("/api/reservations")
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
    console.log("all reserve lenght" + allReservations.length);
  }

  if (meal.reservationCount < meal.max_reservations) {
    return (
      <div className="mealBookForm">
        <div className="InputForm">
          <h3 className="InputFormHeading">Book a reservation</h3>
          <div className="InputFormItem">
            <label className="InputLabel">Name</label>{" "}
            <input
              className="InputDiv"
              type="text"
              id="name"
              size="40"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="InputFormItem">
            <label className="InputLabel">Phone</label>{" "}
            <input
              type="text"
              id="mobileNo"
              size="11"
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>
          <div className="InputFormItem">
            <label className="InputLabel">Email </label>{" "}
            <input
              className="InputDiv"
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="InputFormItem">
            <label className="InputLabel">Time</label>{" "}
            <input
              className="InputDiv"
              type="datetime-local"
              id="dateTime"
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div className="InputFormItem">
            <label className="InputLabel">Number of Guests</label>{" "}
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
          <div className="bookReservationButton">
            <ReserveButton
              reserveButtonAction={reserveMealAction}
              name={name}
            />
            <div>
              <h5>{reservationUpdateResponse}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h3>Sorry...No reservation available for {meal.title}</h3>;
  }
}
