const express = require("express");
const router = express.Router();
const knex = require("../database");
//Returns all reservations
router.get("/", async (request, response) => {
  const allReservations = await knex("reservation").select("*");
  response.json(allReservations);
});

//Adds a new reservation
router.post("/", async (request, response) => {
  try {
    const newReservation = await knex("reservation").insert(request.body);
    response.json(newReservation);
  } catch (error) {
    throw error;
  }
});
//Returns reservation by id
router.get("/:id", async (request, response) => {
  try {
    const inputReservationId = request.params.id;
    const getReservation = await knex("reservation")
      .where({ id: inputReservationId })
      .select("*");
    response.json(getReservation);
  } catch (error) {
    throw error;
  }
});
//Updates the reservation by id
router.put("/:id", async (request, response) => {
  try {
    const inputReservationId = request.params.id;
    const newEmail = request.body.contact_email;
    const updatedContext = await knex("reservation")
      .where({ id: inputReservationId })
      .update({ contact_email: newEmail });
    response.json(updatedContext);
  } catch (error) {
    throw error;
  }
});
//Deletes the reservation by id
router.delete("/:id", async (request, response) => {
  try {
    const inputReservationId = request.params.id;
    const deleteContext = await knex("reservation")
      .where({ id: inputReservationId })
      .del();
    response.json(deleteContext);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
