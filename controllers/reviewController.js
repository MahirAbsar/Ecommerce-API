const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../error");
const { checkPermission } = require("../utils");

const createReview = async (req, res) => {
  const { product: productID } = req.body;

  const product = await Product.findOne({ _id: productID });
  if (!product) {
    throw new NotFoundError(`No product found with id: ${productID}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productID,
    user: req.body.userID,
  });
  if (alreadySubmitted) {
    throw new BadRequestError("Already Submitted!!!");
  }
  req.body.user = req.user.userID;
  const review = await Review.create(req.body);
  return res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: "product",
      select: "name company",
    })
    .populate({ path: "user", select: "name" });
  return res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { id: reviewID } = req.params;

  const review = await Review.findOne({ _id: reviewID });
  if (!review) {
    throw new NotFoundError(`No review found with id: ${reviewID}`);
  }
  return res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewID });

  if (!review) {
    throw new NotFoundError(`No review found with id:${reviewID}`);
  }

  checkPermission(req.user, review.user);
  review.rating = rating === undefined ? review.rating : rating;
  review.title = title === undefined ? review.title : title;
  review.comment = comment === undefined ? review.comment : comment;
  await review.save();
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Success!!! Review was updated" });
};

const deleteReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const review = await Review.findOne({ _id: reviewID });

  if (!review) {
    throw new NotFoundError(`No review found with id:${reviewID}`);
  }

  checkPermission(req.user, review.user);
  await review.remove();
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Success!!! Review was deleted" });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
