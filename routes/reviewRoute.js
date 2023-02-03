const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const authentication = require("../middleware/authentication");

router.route("/").post(authentication, createReview).get(getAllReviews);
router
  .route("/:id")
  .get(getSingleReview)
  .patch(authentication, updateReview)
  .delete(authentication, deleteReview);
