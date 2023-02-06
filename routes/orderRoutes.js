const express = require("express");
const router = express.Router();
const { authenticate, authorization } = require("../utils");

const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  showCurrentUserOrder,
} = require("../controllers/orderController");

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorization("admin"), getAllOrders);
router.route("/showAllMyOrders").get(authenticate, showCurrentUserOrder);
router
  .route("/:id")
  .patch(authenticate, getSingleOrder)
  .patch(authenticate, updateOrder);
