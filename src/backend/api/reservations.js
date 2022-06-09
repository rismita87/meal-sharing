const express = require("express");
const { ValidationError } = require("./error");
const router = express.Router();
const knex = require("../database");
const issues = { dateIssue: "", idIssue: "" };
//Returns all reservations
router.get("/", allReservations);
async function allReservations(request, response) {
  const allReservations = await knex("reservation").select("*");
  console.log(allReservations);
  response.json(allReservations);
}

//Adds a new reservation
router.post("/", addNewReservation);
async function addNewReservation(request, response) {
  try {
    if (
      dateIsValid(request.body.created_date) &&
      (await mealExists(request.body.meal_id))
    ) {
      console.log("===" + request.body);
      const newReservation = await knex("reservation").insert(request.body);
      response.json("Reservation added");
    } else {
      throw new ValidationError(issues.dateIssue + " " + issues.idIssue);
    }
  } catch (error) {
    response.json(JSON.stringify(error.message));
  }
}
//Returns reservation by id
router.get("/:id", returnReservationById);
async function returnReservationById(request, response) {
  try {
    const inputReservationId = request.params.id;
    if (isNaN(inputReservationId)) {
      //respond with status 400 when inputMealId is not parseable
      response.status(400).send("wrong id format");
    } else if (inputReservationId) {
      const getReservation = await knex("reservation")
        .where({ id: inputReservationId })
        .select("*");
      getReservation.length > 0
        ? response.json(getReservation)
        : response.json("No reservation with this id number!!");
    }
  } catch (error) {
    console.log(error);
  }
}
//Updates the reservation by id
router.put("/:id", updateReservationById);
async function updateReservationById(request, response) {
  try {
    const inputReservationId = request.params.id;
    if (isNaN(inputReservationId)) {
      //respond with status 400 when inputMealId is not parseable
      response.status(400).send("wrong id format");
    } else if (inputReservationId) {
      const newEmail = request.body.contact_email;
      const updatedContext = await knex("reservation")
        .where({ id: inputReservationId })
        .update({ contact_email: newEmail });
      updatedContext > 0
        ? response.status(200).send("Success!!")
        : response.status(200).send(" Nothing updated!!");
    }
  } catch (error) {
    console.log(error);
  }
}
//Deletes the reservation by id
router.delete("/:id", async (request, response) => {
  try {
    const inputReservationId = request.params.id;
    if (isNaN(inputReservationId)) {
      //respond with status 400 when inputMealId is not parseable
      response.status(400).send("wrong id format");
    } else if (inputReservationId) {
      const deleteContext = await knex("reservation")
        .where({ id: inputReservationId })
        .del();
      deleteContext > 0
        ? response.status(200).send("Success!!")
        : response
            .status(200)
            .send("Reservation with this id does not exist!!");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

async function mealExists(mealid) {
  issues.mealExists = "";
  const getMeal = await knex("meal").where({ id: mealid }).select("*");

  if (getMeal.length > 0) {
    return true;
  } else {
    issues.idIssue = "The meal that you are entering does not exist";
    return false;
  }
}
function dateIsValid(dateStr) {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
  issues.dateIssue = "";
  if (dateStr.match(regex) === null) {
    issues.dateIssue =
      "Date Not in correct format, supported date format is yyyy-mm-dd";
    return false;
  } else {
    return true;
  }
}
