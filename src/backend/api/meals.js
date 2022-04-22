const express = require("express");
const router = express.Router();
const knex = require("../database");

//Returns all meals
router.get("/", async (request, response) => {
  let maxPrice = 100000;
  let title = "%";
  let createdAfter = 2000;
  let limit = (await knex("meal")).length;
  let availableReservations = false;
  const keyArray = Object.keys(request.query);

  //for each key the respected operation related value gets
  //assigned replacing the default values
  keyArray.forEach((key) => {
    switch (key) {
      case "maxPrice":
        maxPrice = request.query.maxPrice;
        break;
      case "availableReservations":
        availableReservations = request.query.availableReservations;
        break;
      case "title":
        title = request.query.title;
        break;
      case "createdAfter":
        createdAfter = request.query.createdAfter;
        break;
      case "limit":
        limit = request.query.limit;
        break;
    }
  });
  let filtermeal = knex("meal");
  filtermeal
    .where("price", "<", maxPrice)
    .where("title", "like", "%" + title + "%")
    .where("created_date", ">", new Date(createdAfter))
    .limit(limit)
    .offset(0);

  //to filter as per available reservation
  if (availableReservations) {
    filtermeal = knex(
      filtermeal
        .leftJoin(
          knex("reservation")
            .select("meal_id")
            .count("meal_id", { as: "reservationCount" })
            .groupBy("meal_id")
            .as("t1"),
          "t1.meal_id",
          "=",
          "meal.id"
        )
        .select(
          "meal.*",
          knex.raw("IFNULL(reservationCount,0) as reservationCount")
        )
        .as("meal_reservervation")
    ).where(
      "meal_reservervation.max_reservations",
      ">",
      knex.raw("meal_reservervation.reservationCount")
    );
  }
  response.json(await filtermeal);
});

//Adds a new meal
router.post("/", async (request, response) => {
  try {
    console.log(request.body);
    const newMeal = await knex("meal").insert(request.body);
    response.json(newMeal);
  } catch (error) {
    throw error;
  }
});
//Returns meal by id
router.get("/:id", async (request, response) => {
  try {
    const inputMealId = request.params.id;
    const getMeal = await knex("meal").where({ id: inputMealId }).select("*");
    response.json(getMeal);
  } catch (error) {
    throw error;
  }
});
//Updates the meal by id
router.put("/:id", async (request, response) => {
  try {
    const inputMealId = request.params.id;
    const newLocation = request.body.location;
    const updatedContext = await knex("meal")
      .where({ id: inputMealId })
      .update({ location: newLocation });
    response.json(updatedContext);
  } catch (error) {
    throw error;
  }
});
//Deletes the meal by id
router.delete("/:id", async (request, response) => {
  try {
    const inputMealId = request.params.id;
    const deleteContext = await knex("meal").where({ id: inputMealId }).del();
    response.json(deleteContext);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
