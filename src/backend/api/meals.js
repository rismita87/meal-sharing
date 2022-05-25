const express = require("express");
const { ValidationError } = require("./error");
const router = express.Router();
const knex = require("../database");
const issues = { dateIssue: "" };
//Returns all meals
router.get("/", allMeals);
async function allMeals(request, response) {
  let maxPrice = 100000;
  let title = "%";
  let createdAfter = 2000;
  let count = await knex.count("id").from("meal").first();
  let limit = parseInt(Object.values(count)[0]);
  let availableReservations = false;
  let isError = false;
  const queryKeys = Object.keys(request.query);

  //for each key the respected operation related value gets
  //assigned replacing the default values
  queryKeys.forEach((key) => {
    switch (key) {
      case "maxPrice":
        {
          if (isNaN(request.query.maxPrice)) {
            isError = true;
            response.status(400).send("wrong maxPrice format");
          } else {
            maxPrice = request.query.maxPrice;
          }
        }
        break;
      case "availableReservations":
        availableReservations = request.query.availableReservations;
        break;
      case "title":
        title = request.query.title;
        break;
      case "createdAfter":
        {
          // to ckeck for valid data type format for date
          const isValidDate = function (date) {
            return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
          };
          if (isValidDate(request.query.createdAfter)) {
            createdAfter = request.query.createdAfter;
          } else {
            isError = true;
            response.status(400).send("wrong date format");
          }
        }
        break;
      case "limit":
        if (isNaN(request.query.limit)) {
          isError = true;
          response.send("wrong limit format");
        } else {
          limit = request.query.limit;
        }
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
  const meal_reservervation_check_query = filtermeal
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
    .as("meal_reservervation");

  if (availableReservations) {
    filtermeal = knex(meal_reservervation_check_query).where(
      "meal_reservervation.max_reservations",
      ">",
      knex.raw("meal_reservervation.reservationCount")
    );
  }
  if (!isError) {
    response.json(await filtermeal);
  }
}

//Adds a new meal
router.post("/", addNewMeal);
async function addNewMeal(request, response) {
  try {
    if (dateIsValid(request.body.created_date)) {
      const newMeal = await knex("meal").insert(request.body);
      response.json("New meal added");
    } else {
      throw new ValidationError(issues.dateIssue);
    }
  } catch (error) {
    response.json(JSON.stringify(error.message));
  }
}
//Returns meal by id
router.get("/:id", returnMealById);
async function returnMealById(request, response) {
  try {
    const inputMealId = request.params.id;
    if (isNaN(inputMealId)) {
      //respond with status 400 when inputMealId is not parseable
      response.status(400).send("wrong id format");
    } else if (inputMealId) {
      const getMeal = await knex("meal").where({ id: inputMealId }).select("*");
      getMeal.length > 0
        ? response.json(getMeal)
        : response.json("No meal with this id number!!");
    }
  } catch (error) {
    console.log(error);
  }
}
//Updates the meal by id
router.put("/:id", updateMealById);
async function updateMealById(request, response) {
  try {
    const inputMealId = request.params.id;
    if (isNaN(inputMealId)) {
      //respond with status 400 when inputMealId is not parseable
      response.status(400).send("wrong id format");
    } else if (inputMealId) {
      const newLocation = request.body.location;
      const updatedContext = await knex("meal")
        .where({ id: inputMealId })
        .update({ location: newLocation });
      updatedContext > 0
        ? response.status(200).send("Success!!")
        : response.status(200).send(" Nothing updated!!");
    }
  } catch (error) {
    console.log(error);
  }
}
//Deletes the meal by id
router.delete("/:id", deleteMealById);
async function deleteMealById(request, response) {
  try {
    const inputMealId = request.params.id;
    if (isNaN(inputMealId)) {
      //respond with status 400 when inputMealId is not parseable
      response.status(400).send("wrong id format");
    } else if (inputMealId) {
      const deleteContext = await knex("meal").where({ id: inputMealId }).del();
      deleteContext > 0
        ? response.status(200).send("Success!!")
        : response.status(200).send("Meal with this id does not exist!!");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;

function dateIsValid(dateStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  issues.dateIssue = "";
  if (dateStr.match(regex) === null) {
    issues.dateIssue =
      "Date Not in correct format, supported date format is yyyy-mm-dd";
    return false;
  }

  const date = new Date(dateStr);

  return date.toISOString().startsWith(dateStr);
}
