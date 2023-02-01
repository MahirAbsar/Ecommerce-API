const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get(authentication, authorization("admin", "owner"), getAllUsers);
router.route("/showMe").get(authentication, showCurrentUser);
router.route("/updateUser").patch(authentication, updateUser);
router.route("/updateUserPassword").patch(authentication, updateUserPassword);
router.route("/:id").get(authentication, getSingleUser);

module.exports = router;
