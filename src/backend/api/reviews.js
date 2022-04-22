const express = require("express");
const router = express.Router();
const knex = require("../database");
//Returns all reviews
router.get("/", async (request, response) => {
  const allReviews = await knex("review").select("*");
  response.json(allReviews);
});

//Adds a new review
router.post("/", async (request, response) => {
  try {
    const newReview = await knex("review").insert(request.body);
    response.json(newReview);
  } catch (error) {
    throw error;
  }
});
//Returns review by id
router.get("/:id", async (request, response) => {
  try {
    const inputReviewId = request.params.id;
    const getReview = await knex("review")
      .where({ id: inputReviewId })
      .select("*");
    response.json(getReview);
  } catch (error) {
    throw error;
  }
});
//Updates the review by id
router.put("/:id", async (request, response) => {
  try {
    const inputReviewId = request.params.id;
    const newStar = request.body.stars;
    const newDescription = request.body.description;
    const updatedContext = await knex("review")
      .where({ id: inputReviewId })
      .update({ stars: newStar, description: newDescription });
    response.json(updatedContext);
  } catch (error) {
    throw error;
  }
});
//Deletes the review by id
router.delete("/:id", async (request, response) => {
  try {
    const inputReviewId = request.params.id;
    const deleteContext = await knex("review")
      .where({ id: inputReviewId })
      .del();
    response.json(deleteContext);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
