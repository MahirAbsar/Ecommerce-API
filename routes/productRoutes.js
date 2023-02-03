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

module.exports = router;
