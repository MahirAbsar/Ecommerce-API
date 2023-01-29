const CustomAPIError = require("./custom-api");
const BadRequestError = require("./bad-request");
const UnauthenticatedError = require("./unauthenticated");
const UnauthorizedError = require("./unauthorized");
const NotFoundError = require("./not-found");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
};
