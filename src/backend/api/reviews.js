const express = require("express");
const { ValidationError } = require("./error");
const router = express.Router();
const knex = require("../database");
const issues = { dateIssue: "", idIssue: "" };

//Returns all reviews
router.get("/", allReviews);
async function allReviews(request, response) {
  const allReviews = await knex("review").select("*");
  response.json(allReviews);
}

//Adds a new review
router.post("/", addNewReview);
async function addNewReview(request, response) {
  try {
    if (
      dateIsValid(request.body.created_date) &&
      (await mealExists(request.body.meal_id))
    ) {
      const newReview = await knex("review").insert(request.body);
      response.json("Review received.");
    } else {
      throw new ValidationError(issues.dateIssue + " " + issues.idIssue);
    }
  } catch (error) {
    response.json(JSON.stringify(error.message));
  }
}
//Returns review by id
router.get("/:id", returnReviewByID);
async function returnReviewByID(request, response) {
  try {
    const inputReviewId = request.params.id;
    if (isNaN(inputReviewId)) {
      //respond with status 400 when inputReviewId is not parseable
      response.status(400).send("wrong id format");
    } else if (inputReviewId) {
      const getReview = await knex("review")
        .where({ id: inputReviewId })
        .select("*");
      getReview.length > 0
        ? response.json(getReview)
        : response.json("No review with this id number!!");
    }
  } catch (error) {
    console.log(error);
  }
}
//Updates the review by id
router.put("/:id", UpdateReviewById);
async function UpdateReviewById(request, response) {
  try {
    const inputReviewId = request.params.id;
    if (isNaN(inputReviewId)) {
      //respond with status 400 when inputReviewId is not parseable
      response.status(400).send("wrong id format");
    } else if (inputReviewId) {
      const newStar = request.body.stars;
      const newDescription = request.body.description;
      const updatedContext = await knex("review")
        .where({ id: inputReviewId })
        .update({ stars: newStar, description: newDescription });
      updatedContext > 0
        ? response.status(200).send("Success!!")
        : response.status(200).send(" Nothing updated!!");
    }
  } catch (error) {
    console.log(error);
  }
}
//Deletes the review by id
router.delete("/:id", deleteReviewById);
async function deleteReviewById(request, response) {
  try {
    const inputReviewId = request.params.id;
    if (isNaN(inputReviewId)) {
      //respond with status 400 when inputReviewId is not parseable
      response.status(400).send("wrong id format");
    } else if (inputReviewId) {
      const deleteContext = await knex("review")
        .where({ id: inputReviewId })
        .del();
      deleteContext > 0
        ? response.status(200).send("Success!!")
        : response.status(200).send("Review with this id does not exist!!");
    }
  } catch (error) {
    console.log(error);
  }
}

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
