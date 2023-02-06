const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");
const { getSingleProductReview } = require("../controllers/reviewController");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

router
  .route("/")
  .post(authentication, authorization("admin"), createProduct)
  .get(getAllProducts);

router
  .route("/uploadImage")
  .post(authentication, authorization("admin"), uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authentication, authorization("admin"), updateProduct)
  .delete(authentication, authorization("admin"), deleteProduct);

router.get("/:id/reviews", getSingleProductReview);

module.exports = router;
