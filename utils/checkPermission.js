const { UnauthorizedError } = require("../error");

const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userID === resourceUserId.toString()) return;
  throw new UnauthorizedError("Not authorized to view this page");
};

module.exports = checkPermission;
